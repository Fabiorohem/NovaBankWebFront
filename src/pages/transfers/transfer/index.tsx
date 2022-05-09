import {
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
	Grid,
	Icon,
	Input,
	Select,
	Spacer,
	Table,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
import { FormEvent, Fragment, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { formatCurrency, parseToBrDate } from '../../../helpers';
import Pagination from '../../../components/Pagination';
import { useTransfer } from '../../../hooks/useTransfer';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import { SearchBanco } from '../../../components/SearchBank';

const statusMapping = {
	CREATED: 'Transferência criada',
	PENDING: 'Transferência pendente de execução.',
	BANK_PROCESSING: 'Transferência em processamento bancário.',
	BLOCKED: 'Transferência bloqueada.',
	DONE: 'Transferência realizada.',
	FAILED: ' Transferência falhou.',
	CANCELLED: 'Transferência cancelada.'
};
const typeAccountMapping = {
	'Conta corrente': 'CONTA_CORRENTE',
	'Conta poupança': 'CONTA_POUPANCA'
};

export default function Transfer() {
	const {
		errorMessage,
		setErrorMessage,
		setSuccessMessage,
		successMessage,
		createBankTransfer,
		createAsaasTransfer
	} = useTransfer();
	const [ ownerName, setOwnerName ] = useState('');
	const [ ownerBirthDate, setOwnerBirthDate ] = useState('');
	const [ cpfCnpj, setCpfCnpj ] = useState('');
	const [ code, setCode ] = useState('');
	const [ agency, setAgency ] = useState('');
	const [ account, setAccount ] = useState('');
	const [ accountDigit, setAccountDigit ] = useState('');
	const [ bankAccountType, setBankAccountType ] = useState('');
	const [ transferType, setTransferType ] = useState('Conta Bancária');
	const [ value, setValue ] = useState('');
	const [ accountName, setAccountName ] = useState('');
	const [ walletId, setWalletId ] = useState('');

	function handleCreateBankTransfer(event: FormEvent) {
		event.preventDefault();

		const newValues = {
			value: Number(value),
			bankAccount: {
				bank: {
					code
				},
				accountName,
				ownerName,
				ownerBirthDate,
				cpfCnpj,
				agency,
				account,
				accountDigit,
				bankAccountType: typeAccountMapping[bankAccountType]
			}
		};
		createBankTransfer(newValues);
		Router.push('/transfers');
	}

	function handleCreateAsaasTransfer(event: FormEvent) {
		event.preventDefault();

		const newValues = {
			walletId,
			value
		};
		createAsaasTransfer(newValues);
		Router.push('/transfers');
	}

	return (
		<Fragment>
			<Box w={{ base: '100%' }}  textAlign={'center'} pr={'2%'} pl={'2%'}>
				<Text fontSize="3xl">Transferência</Text>
			</Box>
			<Box w={{ base: '100%' }}  textAlign={'center'} pr={'2%'} pl={'2%'}>
				<FormControl>
					<FormLabel htmlFor="accountType">Tipo de conta</FormLabel>
					<Select value={transferType} onChange={(e) => setTransferType(e.target.value)}>
						<option>Conta Bancária</option>
						<option>Carteira Agiliza</option>
					</Select>
				</FormControl>
			</Box>
			<br />
			<br />
			{transferType === 'Conta Bancária' ? (
				<Fragment>
					<Box
						width={{ base: '100%' }}
						
						height={10020}
						overflowX={{ sm: 'scroll' }}
						pr={'2%'}
						pl={'2%'}
					>
						<form>
							<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} marginBottom={'15px'}>
								<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
									Dados do titular
								</Text>
							</Box>
							<br />
							<Grid
								templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
								gap={6}
							>
								<FormControl>
									<FormLabel htmlFor="ownerAccountName">Titular da Conta</FormLabel>
									<Input
										id="ownerAccountName"
										type="text"
										onChange={(e) => setOwnerName(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="birthDay">Data de nascimento</FormLabel>
									<Input
										id="birthDay"
										type="date"
										onChange={(e) => setOwnerBirthDate(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="cpfCnpj">CPF/CNPJ do titular da conta</FormLabel>
									<Input
										id="cpfCnpj"
										placeholder=""
										type="text"
										onChange={(e) => setCpfCnpj(e.target.value)}
									/>
								</FormControl>
							</Grid>
							<br />
							<br />
							<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} marginBottom={'15px'}>
								<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
									Dados bancários
								</Text>
							</Box>
							<br />
							<Grid
								templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(6, 1fr)' }}
								gap={6}
							>
								<FormControl>
									<FormLabel htmlFor="accountName">Nome da conta</FormLabel>
									<Input
										id="accountName"
										type="text"
										placeholder="Conta Bradesco"
										onChange={(e) => setAccountName(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="bankCode">Cód Banco</FormLabel>
									<Input
										id="bankCode"
										type="text"
										placeholder="230"
										value={code}
										onChange={(e) => setCode(e.target.value.replace(',', '.'))}
									/>
								</FormControl>
								<FormControl>
									<SearchBanco setCode={setCode} />
								</FormControl>
							</Grid>

							<br />
							<Grid
								templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(6, 1fr)' }}
								gap={6}
							>
								<FormControl>
									<FormLabel htmlFor="agency">Agência</FormLabel>
									<Input
										id="agency"
										type="text"
										placeholder="0000"
										onChange={(e) => setAgency(e.target.value.replace(',', '.'))}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="account">Conta</FormLabel>
									<Input
										id="account"
										type="text"
										placeholder="0000"
										onChange={(e) => setAccount(e.target.value.replace(',', '.'))}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="digit">Dígito</FormLabel>
									<Input
										id="digit"
										type="text"
										placeholder="00"
										onChange={(e) => setAccountDigit(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="value">Valor</FormLabel>
									<Input
										id="value"
										type="text"
										placeholder="0,00"
										onChange={(e) => setValue(e.target.value.replace(',', '.'))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel htmlFor="accountType">Tipo de conta</FormLabel>
									<Select
										id="accountType"
										value={bankAccountType}
										onChange={(e) => setBankAccountType(e.target.value)}
									>
										<option>Selecione</option>
										<option>Conta corrente</option>
										<option>Conta poupança</option>
									</Select>
								</FormControl>
							</Grid>
							<Grid templateColumns="repeat(1, 1fr)" gap={6} />
							<br />
							<Button
								marginBottom={'20px'}
								bg="agiliza.purple"
								w="100%"
								type="submit"
								onClick={handleCreateBankTransfer}
							>
								Transferir
							</Button>
						</form>
					</Box>
				</Fragment>
			) : (
				<Fragment>
					<Box w={{ base: '100%' }}  textAlign={'center'} pr={'2%'} pl={'2%'}>
						<form style={{ width: '100%' }}>
							<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} marginBottom={'15px'}>
								<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
									Carteira Agiliza
								</Text>
							</Box>
							<br />
							<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
								<FormControl>
									<FormLabel htmlFor="walletId">Carteira Agiliza</FormLabel>
									<Input
										id="walletId"
										placeholder="0021c712-d963-4d86-a59d-031e7ac51a2e"
										type="text"
										onChange={(e) => setWalletId(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="value">Valor</FormLabel>
									<Input
										id="value"
										placeholder="0,00"
										type="text"
										onChange={(e) => setValue(e.target.value.replace(',', '.'))}
									/>
								</FormControl>
							</Grid>
							<Button
								marginTop={'20px'}
								marginBottom={'20px'}
								bg="agiliza.purple"
								w="100%"
								type="submit"
								onClick={handleCreateAsaasTransfer}
							>
								Transferir
							</Button>
						</form>
					</Box>
				</Fragment>
			)}
		</Fragment>
	);
}
