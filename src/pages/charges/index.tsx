import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';
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
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useAuth } from '../../hooks/useAuth';
import useSWR from 'swr';
import { api } from '../../services/api';

interface ClientProps {
	id: string;
	email: string;
	name: string;
	mobilePhone: string;
	cpfCnpj: string;
	charges: [
		{
			customer: string;
			value: number;
			invoiceUrl: string;
		}
	];
}

interface ChargeProps {
	value: number;
	id: string;
	customer: string;
	description: string;
	billingType: string;
	invoiceUrl: string;
	dueDate: string;
	status: string;
}

const chargeStatusMapping = {
	PENDING: 'Aguardando pagamento',
	RECEIVED: 'Recebida (saldo já creditado na conta)',
	CONFIRMED: 'Pagamento confirmado (saldo ainda não creditado)',
	OVERDUE: 'Vencida',
	REFUNDED: 'Estornada',
	RECEIVED_IN_CASH: 'Recebida em dinheiro (não gera saldo na conta)',
	REFUND_REQUESTED: 'Estorno Solicitado',
	CHARGEBACK_REQUESTED: 'Recebido chargeback',
	CHARGEBACK_DISPUTE: 'Em disputa de chargeback (caso sejam apresentados documentos para contestação)',
	AWAITING_CHARGEBACK_REVERSAL: 'Disputa vencida, aguardando repasse da adquirente',
	DUNNING_REQUESTED: 'Em processo de recuperação',
	DUNNING_RECEIVED: 'Recuperada',
	AWAITING_RISK_ANALYSIS: 'Pagamento em análise'
};

const chargeBillTypeMapping = {
	BOLETO: 'Boleto Bancário',
	CREDIT_CARD: 'Cartão de Crédito',
	PIX: 'Pix',
	UNDEFINED: 'Perguntar ao Cliente'
};

const RenderActionButtons = ({ props }) => {
	const [ confirm, setConfirm ] = useState(false);

	let date = new Date();
	let formatedDate = `${date.getFullYear()}-${date.getMonth() < 10
		? `0${date.getMonth()}`
		: `${date.getMonth()}`}-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;
	const valuesToReceiveInCash = {
		paymentDate: formatedDate,
		value: props.value.toString(),
		notifyCustomer: false
	};

	async function handleReceiveInCash() {
		await props.receiveInCash(props.id, valuesToReceiveInCash);

		document.location.reload();
	}

	async function handleRevertReceiveInCash() {
		await props.revertReceiveInCash(props.id);

		document.location.reload();
	}
	return (
		<Fragment>
			{props.billingType === 'BOLETO' &&
			props.status === 'PENDING' && (
				<Tooltip label={'Confirmar recebimento'} shouldWrapChildren>
					<Icon
						width={5}
						height={5}
						mr={2}
						ml={0}
						as={FcCheckmark}
						cursor={'pointer'}
						onClick={handleReceiveInCash}
					/>
				</Tooltip>
			)}
			{props.billingType === 'BOLETO' &&
			props.status === 'RECEIVED_IN_CASH' && (
				<Tooltip label={'Desfazer recebimento'} shouldWrapChildren>
					<Icon
						width={5}
						height={5}
						mr={2}
						ml={0}
						as={FcCancel}
						cursor={'pointer'}
						onClick={handleRevertReceiveInCash}
					/>
				</Tooltip>
			)}
			{props.status === 'PENDING' && (
				<Fragment>
					{/* <Link href={`charges/${props.id}`}>
						<a>
							<Tooltip label="Editar" shouldWrapChildren>
								<Icon
									width={5}
									height={5}
									mr={2}
									ml={0}
									
									as={FaEdit}
									cursor={'pointer'}
								/>
							</Tooltip>
						</a>
					</Link> */}
				</Fragment>
			)}
			<Tooltip label="Imprimir" shouldWrapChildren>
				<Link href={props.invoiceUrl} passHref>
					<a target="_blank" rel="noreferrer">
						<Icon width={5} height={5} mr={2} ml={0} as={MdPrint} cursor={'pointer'} />
					</a>
				</Link>
			</Tooltip>
			{props.billingType === 'CREDIT_CARD' && (
				<Tooltip label="Estornar" shouldWrapChildren>
					<Icon
						width={5}
						height={5}
						mr={2}
						ml={0}
						as={ImLoop}
						cursor={'pointer'}
						onClick={() => props.reverseACharge(props.id)}
					/>
				</Tooltip>
			)}
			{props.status === 'OVERDUE' ||
				(props.status === 'PENDING' && (
					<Tooltip label="Deletar" shouldWrapChildren>
						<Icon
							width={5}
							height={5}
							mr={2}
							ml={0}
							color={'brand.red'}
							as={MdDelete}
							onClick={() => {
								props.setChargeId(props.id);
								props.onOpen();
							}}
							cursor={'pointer'}
						/>
					</Tooltip>
				))}
		</Fragment>
	);
};
const Filters = () => {
	const { setClientId } = useCharge();
	const [ id, setId ] = useState('');

	function handleCleanInput() {
		const input = document.querySelector('#idClient') as HTMLInputElement;
		input.value = '';
		setId('');
	}
	return (
		<Fragment>
			<Stack spacing={4} direction="column" align="flex-start" width={'350px'} marginBottom={4}>
				<FormControl>
					<FormLabel htmlFor="cpfCnpj">Id do Cliente</FormLabel>
					<Input
						id="idClient"
						onChange={(event) => setId(event.target.value)}
						placeholder="cus_xxxxxxxxxxxx"
					/>
				</FormControl>
				<Stack spacing={4} direction="row" align="flex end" alignSelf={'end'}>
					<Button colorScheme="blue" variant="outline" onClick={() => setClientId(id)}>
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

export default function Charges() {
	function handleToggleFilters() {
		if (filters === 'none') {
			setFilters('block');
		} else [ setFilters('none') ];
	}
	const {
		charges,
		deleteCharge,
		reverseACharge,
		successMessage,
		errorMessage,
		setErrorMessage,
		setSuccessMessage,
		receiveInCash,
		revertReceiveInCash
	} = useCharge();
	const [ chargeId, setChargeId ] = useState('');
	const [ filters, setFilters ] = useState('none');
	const { isOpen, onOpen, onClose } = useDisclosure();
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
				Lista de cobranças
			</Text>
			{charges.length > 0 ? (
				<VStack width="full">
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
						<Filters />
					</Box>
					{errorMessage && (
						<Alert status="error" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
							<AlertIcon />
							<AlertTitle mr={2}>Ação não disponível!</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
							<CloseButton
								onClick={() => setErrorMessage('')}
								position="absolute"
								right="8px"
								top="8px"
							/>
						</Alert>
					)}
					{successMessage && (
						<Alert status="success" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
							<AlertDescription>{successMessage}</AlertDescription>
							<CloseButton
								onClick={() => setSuccessMessage('')}
								position="absolute"
								right="8px"
								top="8px"
							/>
						</Alert>
					)}
					<Box width={{ base: '100%' }} maxW={1200} overflowX={{ sm: 'scroll' }}>
						<Table size={'sm'}>
							<Thead>
								<Tr>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id do Cliente</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Descrição</Th>
									<Th>Valor</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Forma de Pagamento</Th>
									<Th>Status</Th>
									<Th>Data de vencimento</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								{charges.map((charge: ChargeProps) => {
									return (
										<Tr key={charge.id}>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{charge.id}</Td>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
												{charge.customer}
											</Td>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
												{charge.description}
											</Td>
											<Td>{formatCurrency(charge.value)}</Td>
											<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
												{chargeBillTypeMapping[charge.billingType]}
											</Td>
											<Td>{chargeStatusMapping[charge.status]}</Td>
											<Td>{parseToBrDate(charge.dueDate)}</Td>
											<Td>
												<RenderActionButtons
													props={{
														id: charge.id,
														invoiceUrl: charge.invoiceUrl,
														billingType: charge.billingType,
														value: charge.value,
														setChargeId: setChargeId,
														reverseACharge: reverseACharge,
														onOpen,
														status: charge.status,
														receiveInCash,
														revertReceiveInCash,
														setSuccessMessage
													}}
												/>
											</Td>
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
			) : (
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
						<Filters />
					</Box>
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
								deleteCharge(chargeId);
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
