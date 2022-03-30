import { Fragment, useEffect, useState } from 'react';
import { parseToBrDate } from '../../helpers';
import Link from 'next/link';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	VStack,
	Text,
	Button,
	Icon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Tooltip,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton
} from '@chakra-ui/react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { MdDelete, MdPrint } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import Pagination from '../../components/Pagination';
import { formatCurrency } from '../../helpers';
import { useCharge } from '../../hooks/useCharge';
import { usePayment } from '../../hooks/usePayment';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const statusMapping = {
	PENDING: 'Pendente',
	CANCELLED: 'Cancelado',
	BANK_PROCESSING: 'Processamento bancário',
	PAID: 'Pago',
	FAILED: 'Falhou'
};

interface PaymentProps {
	value: number;
	transactionReceiptUrl: string;
	canBeCancelled: boolean;
	id: string;
	description: string;
	dueDate: string;
	status: string;
}

const RenderActionButtons = ({ props }) => {
	return (
		<Fragment>
			{props.transactionReceiptUrl && (
				<Tooltip label="Imprimir" shouldWrapChildren>
					<Link href={props.transactionReceiptUrl} passHref>
						<a target="_blank" rel="noreferrer">
							<Icon width={5} height={5} mr={2} ml={0} color={'white'} as={MdPrint} cursor={'pointer'} />
						</a>
					</Link>
				</Tooltip>
			)}

			{props.canBeCancelled === true && (
				<Tooltip label="Cancelar" shouldWrapChildren>
					<Icon
						width={5}
						height={5}
						mr={2}
						ml={0}
						color={'brand.red'}
						as={MdDelete}
						onClick={() => {
							props.setPaymentId(props.id);
							props.onOpen();
						}}
						cursor={'pointer'}
					/>
				</Tooltip>
			)}
		</Fragment>
	);
};
const Filters = ({ props }) => {
	const { getAPayment } = usePayment();
	const [ id, setId ] = useState('');
	async function handleGetAPayment() {
		if (!id) {
			props.setOpenPaymentTable(false);
			return;
		}
		await getAPayment(id);
		props.setOpenPaymentTable(true);
	}

	function handleCleanInput() {
		const input = document.querySelector('#idPagamento') as HTMLInputElement;
		input.value = '';
		setId('');
	}
	return (
		<Fragment>
			<Stack spacing={4} direction="column" align="flex-start" width={'350px'} marginBottom={4}>
				<FormControl>
					<FormLabel htmlFor="idPagamento">Id do pagamento</FormLabel>
					<Input
						id="idPagamento"
						onChange={(event) => setId(event.target.value)}
						placeholder="4d934213-d3da-472c-990f-76a2bb28c6bb"
					/>
				</FormControl>
				<Stack spacing={4} direction="row" align="flex end" alignSelf={'end'}>
					<Button colorScheme="blue" variant="outline" onClick={handleGetAPayment}>
						Filtrar
					</Button>
					<Button colorScheme="red" variant="outline" onClick={handleCleanInput}>
						Limpar Filtros
					</Button>
				</Stack>
			</Stack>
		</Fragment>
	);
};

export default function Payments() {
	const {
		payments,
		successMessage,
		errorMessage,
		setErrorMessage,
		setSuccessMessage,
		cancelPayment,
		payment
	} = usePayment();
	console.log(payments);
	const [ paymentId, setPaymentId ] = useState('');
	const [ openPaymentTable, setOpenPaymentTable ] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ filters, setFilters ] = useState('none');
	function handleToggleFilters() {
		if (filters === 'none') {
			setFilters('block');
		} else {
			setFilters('none');
		}
	}

	return (
		<Fragment>
			<Text
				fontSize="3xl"
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				paddingLeft={'10px'}
				paddingBottom={'10px'}
			>
				Lista de pagamentos
			</Text>
			{!openPaymentTable ? (
				<VStack height="60vh" width="full">
					<Button
						style={{
							padding: 2,
							width: 100,
							height: 25,
							textAlign: 'center',
							marginLeft: 2
						}}
						colorScheme={'red'}
						onClick={handleToggleFilters}
					>
						Filtros
					</Button>
					<Box display={filters}>
						<Filters props={{ setOpenPaymentTable }} />
					</Box>
					<Box width={{ base: '100%' }} maxW={1200} overflowX={{ sm: 'scroll' }}>
						<Table size="sm">
							<Thead>
								<Tr>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Descrição</Th>
									<Th>Valor</Th>
									<Th>Status</Th>
									<Th>Data de vencimento</Th>
									{payments.map((payment: PaymentProps) => {
										payment.status !== 'CANCELLED' &&
										payment.transactionReceiptUrl !== null && <Th>Actions</Th>;
									})}
								</Tr>
							</Thead>
							<Tbody>
								{payments.map((payment: PaymentProps) => {
									return (
										<Tr key={payment.id}>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{payment.id}</Td>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
												{payment.description}
											</Td>
											<Td>{formatCurrency(payment.value)}</Td>
											<Td>{statusMapping[payment.status]}</Td>
											<Td>{parseToBrDate(payment.dueDate)}</Td>
											{payment.status !== 'CANCELLED' &&
											payment.transactionReceiptUrl !== null && (
												<Td>
													<RenderActionButtons
														props={{
															id: payment.id,
															value: payment.value,
															setPaymentId,
															canBeCancelled: payment.canBeCancelled,
															transactionReceiptUrl: payment.transactionReceiptUrl,
															onOpen,
															status: payment.status
														}}
													/>
												</Td>
											)}
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</Box>
					<Box width={{ base: '100%' }} maxW={1200} overflowX={{ sm: 'scroll' }}>
						<Pagination />
					</Box>
				</VStack>
			) : openPaymentTable ? (
				<Fragment>
					<Button
						style={{
							padding: 2,
							width: 100,
							height: 25,
							textAlign: 'center',
							marginLeft: 2
						}}
						colorScheme={'red'}
						onClick={handleToggleFilters}
					>
						Filtros
					</Button>
					<Box display={filters}>
						<Filters props={{ setOpenPaymentTable }} />
					</Box>
					<Box width={{ base: '100%' }} maxW={1200} height={10020} overflowX={{ sm: 'scroll' }}>
						<Table size={'sm'}>
							<Thead>
								<Tr>
									<Th>Id</Th>
									<Th>Descrição</Th>
									<Th>Valor</Th>
									<Th>Status</Th>
									<Th>Data de vencimento</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>{payment.id}</Td>
									<Td>{payment.description}</Td>
									<Td>{formatCurrency(payment.value)}</Td>
									<Td>{statusMapping[payment.status]}</Td>
									<Td>{parseToBrDate(payment.dueDate)}</Td>
									<Td>
										<RenderActionButtons
											props={{
												id: payment.id,
												value: payment.value,
												setPaymentId,
												canBeCancelled: payment.canBeCancelled,
												transactionReceiptUrl: payment.transactionReceiptUrl,
												onOpen,
												status: payment.status
											}}
										/>
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</Box>
				</Fragment>
			) : (
				<Fragment>
					<Text>Nenhuma cobrança encontrada</Text>
				</Fragment>
			)}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Excluir</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Tem certeza que deseja excluir esse item?</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Cancelar
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								cancelPayment(paymentId);
								onClose();
							}}
						>
							Deletar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>
	);
}
