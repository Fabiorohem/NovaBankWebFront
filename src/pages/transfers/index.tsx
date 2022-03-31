import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Spacer,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { formatCurrency, parseToBrDate } from '../../helpers';
import Pagination from '../../components/Pagination';
import { useTransfer } from '../../hooks/useTransfer';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const statusMapping = {
	CREATED: 'Transferência criada',
	PENDING: 'Transferência pendente de execução.',
	BANK_PROCESSING: 'Transferência em processamento bancário.',
	BLOCKED: 'Transferência bloqueada.',
	DONE: 'Transferência realizada.',
	FAILED: ' Transferência falhou.',
	CANCELLED: 'Transferência cancelada.'
};
const typeBankMapping = {
	BANK_ACCOUNT: 'Conta Bancária',
	ASAAS_ACCOUNT: 'Carteira Asaas'
};

const Filters = ({ props }) => {
	const { getATransfer } = useTransfer();
	const [ id, setId ] = useState('');
	async function handleGetAtransfer() {
		if (!id) {
			props.setOpenPaymentTable(false);
			return;
		}
		await getATransfer(id);
		props.setOpenPaymentTable(true);
	}

	function handleCleanInput() {
		const input = document.querySelector('#idPagamento') as HTMLInputElement;
		input.value = '';
		setId('');
	}
	return (
		<Fragment>
			<Stack spacing={4} direction="column" align="flex-start" width={'350px'}>
				<FormControl>
					<FormLabel htmlFor="idPagamento">Id da transferência</FormLabel>
					<Input
						id="idPagamento"
						onChange={(event) => setId(event.target.value)}
						placeholder="cfdd8372-1a5d-422c-bb95-40c112acd616"
					/>
				</FormControl>
				<Stack spacing={4} direction="row" align="flex end" alignSelf={'end'}>
					<Button colorScheme="blue" variant="outline" onClick={handleGetAtransfer}>
						Filtrar
					</Button>
					<Button colorScheme="agiliza.purple" variant="outline" onClick={handleCleanInput}>
						Limpar Filtros
					</Button>
				</Stack>
			</Stack>
		</Fragment>
	);
};

export default function Transfers() {
	const { transfers, transfer, successMessage, setSuccessMessage, errorMessage, setErrorMessage } = useTransfer();
	const [ openPaymentTable, setOpenPaymentTable ] = useState(false);
	const [ filters, setFilters ] = useState('none');
	function handleToggleFilters() {
		if (filters === 'none') {
			setFilters('block');
		} else {
			setFilters('none');
		}
	}
	setTimeout(() => {
		setErrorMessage(''), setSuccessMessage('');
	}, 10000);
	return (
		<Fragment>
			{!openPaymentTable ? (
				<Fragment>
					<Box w="100%" textAlign={'center'}>
						<Text fontSize="3xl">Transferências</Text>
					</Box>
					<Button
						style={{
							padding: 2,
							width: 100,
							height: 25,
							textAlign: 'center',
							marginLeft: 2
						}}
						colorScheme={'purple'}
						onClick={handleToggleFilters}
					>
						Filtros
					</Button>
					<Box display={filters}>
						<Filters props={{ setOpenPaymentTable }} />
					</Box>
					<Box width={{ base: '100%' }} >
						<Table variant="simple" size={'sm'}>
							{successMessage && (
								<Alert status="success" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
									<AlertDescription>{successMessage}</AlertDescription>
									<CloseButton
										onClick={() => setSuccessMessage('')}
										position="absolute"
										right="8px"
										top="15px"
									/>
								</Alert>
							)}
							{errorMessage && (
								<Alert status="error" variant="solid">
									<AlertIcon />
									<AlertTitle mr={2}>Ação não disponível!</AlertTitle>
									<AlertDescription>{errorMessage}</AlertDescription>
									<CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
								</Alert>
							)}
							<Thead>
								<Tr>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id da transferência</Th>
									<Th>data de criação</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
										Data de processamento
									</Th>
									<Th>valor</Th>
									<Th>tipo de conta</Th>
									<Th>status</Th>
								</Tr>
							</Thead>
							<Tbody>
								{transfers.map((transfer) => (
									<Tr key={transfer.id}>
										<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{transfer.id}</Td>
										<Td>{parseToBrDate(transfer.dateCreated)}</Td>
										<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
											{parseToBrDate(transfer.scheduleDate)}
										</Td>
										<Td>{formatCurrency(transfer.value)}</Td>
										<Td>{typeBankMapping[transfer.type]}</Td>
										<Td>{statusMapping[transfer.status]}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
						<Pagination />
					</Box>
				</Fragment>
			) : (
				<Fragment>
					<Box w="100%" textAlign={'center'}>
						<Text fontSize="3xl">Transferências</Text>
					</Box>
					<Button
						style={{
							padding: 2,
							width: 100,
							height: 25,
							textAlign: 'center',
							marginLeft: 2
						}}
						colorScheme={'purple'}
						onClick={handleToggleFilters}
					>
						Filtros
					</Button>
					<Box display={filters}>
						<Filters props={{ setOpenPaymentTable }} />
					</Box>
					<Box width={{ base: '100%' }}  >
						<Table size={'sm'}>
							<Thead>
								<Tr>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id da transferência</Th>
									<Th>data de criação</Th>
									<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
										Data de processamento
									</Th>
									<Th>valor</Th>
									<Th>tipo de conta</Th>
									<Th>status</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{transfer.id}</Td>
									<Td>{transfer.dateCreated}</Td>
									<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>
										{transfer.scheduleDate}
									</Td>
									<Td>{formatCurrency(transfer.value)}</Td>
									<Td>{typeBankMapping[transfer.status]}</Td>
									<Td>{statusMapping[transfer.status]}</Td>
								</Tr>
							</Tbody>
						</Table>
					</Box>
				</Fragment>
			)}
		</Fragment>
	);
}
