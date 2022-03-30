import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Table,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tooltip,
	Tr
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FormEvent, Fragment, useState } from 'react';
import { usePayment } from '../../../hooks/usePayment';
import { formatCurrency } from '../../../helpers';

export default function Create() {
	const [ identificationField, setIdentificationField ] = useState('');
	const [ barCode, setBarCode ] = useState('');
	const {
		errorMessage,
		setErrorMessage,
		createSimulateAPayment,
		simulatePayment,
		openSimulateTable,
		setOpenSimulateTable
	} = usePayment();

	function handleSimulateAPayment(event: FormEvent) {
		event.preventDefault();
		const newValue = {
			identificationField,
			barCode
		};
		createSimulateAPayment(newValue);
	}

	setTimeout(() => {
		setErrorMessage('');
	}, 10000);

	return (
		<Fragment>
			{errorMessage && (
				<Alert status="error" variant="solid">
					<AlertIcon />
					<AlertTitle mr={2}>Ação não disponível!</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
					<CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
				</Alert>
			)}
			<Text
				fontSize="3xl"
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				paddingLeft={'10px'}
				paddingBottom={'10px'}
			>
				Simular pagamento
			</Text>
			<form style={{ width: '100%', maxWidth: 1200, paddingLeft: '2%', paddingRight: '4%' }}>
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}>
					<FormControl>
						<FormLabel htmlFor="identificationField">Linha digitável do boleto</FormLabel>
						<Input
							placeholder="03399.77779 29900.000000 04751.101017 1 81510000002990"
							onChange={(e) => setIdentificationField(e.target.value)}
							id="identificationField"
						/>
					</FormControl>
					<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<Text fontSize="1xl" display={'flex'} alignItems={'self-start'} marginTop={{ sm: 4 }}>
							Ou
						</Text>
					</Box>
					<FormControl>
						<FormLabel htmlFor="scheduleDate">Código de barras</FormLabel>
						<Input
							id="scheduleDate"
							placeholder="03398884400004211779201551005290404760030102"
							type="text"
							onChange={(e) => setBarCode(e.target.value)}
						/>
					</FormControl>
				</Grid>
				<br />
				<Button marginBottom={'20px'} bg="agiliza.purple" w="100%" type="submit" onClick={handleSimulateAPayment}>
					Simular pagamento
				</Button>
			</form>
			{openSimulateTable && (
				<Fragment>
					<Tooltip label="Fechar" shouldWrapChildren>
						<CloseIcon onClick={() => setOpenSimulateTable(false)} />
					</Tooltip>
					<Box width={{ base: '100%' }} maxW={1200} height={10020} overflowX={{ sm: 'scroll' }}>
						<Table>
							<Thead>
								<Tr>
									<Th>Beneficiário</Th>
									<Th>cód banco</Th>
									<Th>CNPJ/CPF</Th>
									<Th>Data de vencimento</Th>
									<Th>Data mínima p/ pagamento</Th>
									<Th>Valor</Th>
									<Th>Taxa</Th>
								</Tr>
							</Thead>
							<Tbody>
								{simulatePayment.map((simulate) => (
									<Tr key={simulate.bankSlipInfo.beneficiaryCpfCnpj}>
										<Td>{simulate.bankSlipInfo.beneficiaryName}</Td>
										<Td>{simulate.bankSlipInfo.bank}</Td>
										<Td>{simulate.bankSlipInfo.beneficiaryCpfCnpj}</Td>
										<Td>{simulate.bankSlipInfo.dueDate}</Td>
										<Td>{simulate.minimumScheduleDate}</Td>
										<Td>{formatCurrency(simulate.bankSlipInfo.value)}</Td>
										<Td>{formatCurrency(simulate.fee)}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				</Fragment>
			)}
		</Fragment>
	);
}
