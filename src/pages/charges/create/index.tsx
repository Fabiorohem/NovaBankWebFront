import { useRouter } from 'next/router';
import { FormEvent, Fragment, useState } from 'react';

import {
	FormControl,
	FormLabel,
	Input,
	Grid,
	Button,
	Box,
	Text,
	Select,
	Textarea,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Checkbox,
	useDisclosure,
	Stack
} from '@chakra-ui/react';
import { useCharge } from '../../../hooks/useCharge';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';
import { useClient } from '../../../hooks/useClients';
import { SearchClient } from '../../../components/SearchClient';

export default function Create() {
	const options = [ 'Boleto Bancário', 'Cartão de Crédito', 'Pix', 'Pergunte ao Cliente' ];
	const chargeBillTypeMapping = {
		'Boleto Bancário': 'BOLETO',
		'Cartão de Crédito': 'CREDIT_CARD',
		Pix: 'PIX',
		'Pergunte ao Cliente': 'UNDEFINED'
	};

	const lateFeeTypeMapping = {
		Percentual: 'PERCENTAGE',
		'Valor fixo': 'FIXED'
	};

	const route = useRouter();

	const { createCashCharge, createParcelCharge, setErrorMessage, errorMessage } = useCharge();
	const [ clientId, setClientId ] = useState('');
	const [ billingType, setBillingType ] = useState('');
	const [ billValue, setBillType ] = useState(0);
	const [ dueDate, setDueDate ] = useState('');
	const [ lateFee, setLateFeeType ] = useState('');
	const [ postalService, setPostalService ] = useState(false);
	const [ fee, setFee ] = useState(0);
	const [ discount, setDiscount ] = useState(0);
	const [ discountType, setDiscountType ] = useState('');

	const [ installment, setInstallment ] = useState(0);

	const [ feesMonth, setFeesMonth ] = useState('');
	const [ chargedescription, setChargeDescription ] = useState('');

	const [ parcelas, setParcelas ] = useState([
		{
			value: 0,
			label: 'A vista'
		}
	]);

	function handleCashCharge(event: FormEvent) {
		event.preventDefault();

		const newData = {
			customer: clientId,
			billingType: chargeBillTypeMapping[billingType],
			value: billValue,
			dueDate,
			description: chargedescription,
			discount: {
				value: discount > 0 ? discount : 0,
				type: lateFeeTypeMapping[discountType]
			},
			interest: {
				value: fee > 0 ? fee : 0
			},
			fine: {
				value: fee > 0 ? fee : 0,
				type: lateFeeTypeMapping[lateFee]
			},
			postalService
		};

		createCashCharge(newData);
		route.push('/charges');
	}

	function handleParcelCharge(event: FormEvent) {
		event.preventDefault();

		let installmentCount = installment;
		let installmentValue = billValue / installment;

		const newData = {
			customer: clientId,
			billingType: chargeBillTypeMapping[billingType],
			installmentCount,
			installmentValue,
			totalValue: billValue,
			dueDate,
			description: chargedescription,
			discount: {
				value: discount > 0 ? discount : 0,
				type: lateFeeTypeMapping[discountType]
			},
			interest: {
				value: fee > 0 ? fee : 0
			},
			fine: {
				value: fee > 0 ? fee : 0,
				type: lateFeeTypeMapping[lateFee]
			},
			postalService
		};

		createParcelCharge(newData);
		route.push('/charges');
	}

	const formatCurrency = (value) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value);
	};

	const handleBillType = (e) => {
		let valor = Number(e.target.value);
		setBillType(valor);

		let parcelasArray = [
			{
				value: 0,
				label: 'A vista'
			}
		];

		if (valor >= 10) {
			let divisao = Number(valor / 5);
			divisao = divisao > 12 ? 12 : divisao;

			for (let i = 1; i < divisao; i++) {
				let parcVal = i + 1;
				let valLabParc = valor / parcVal;

				parcelasArray.push({
					value: parcVal,
					label: `${parcVal} parcelas de (${formatCurrency(Number(valLabParc))})`
				});
			}
		}

		setParcelas(parcelasArray);
	};

	const feeMonthPercent = Number(billValue) * Number(feesMonth) / 100;
	const assessmentPercent = Number(billValue) * Number(fee) / 100;
	const fixedAssessment = Number(billValue) * Number(fee) / 100;
	const discountPercent = Number(billValue) * Number(discount) / 100;

	return (
		<Fragment>
			<Box display={'flex'} maxH={'35px'}>
				<Text fontSize="3xl" paddingBottom={'10px'}>
					Criar nova cobrança
				</Text>
			</Box>

			<form style={{ width: '100%', maxWidth: 1120, paddingLeft: '2%', paddingRight: '4%' }}>
				<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} paddingTop={'15px'} marginBottom={10}>
					<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
						Dados da Cobrança
					</Text>
				</Box>
				<Grid templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel>Cliente</FormLabel>
						<Input
							value={clientId}
							onChange={(e) => setClientId(e.target.value)}
							placeholder="cus_000028303088"
						/>
					</FormControl>
					<FormControl>
						<SearchClient setClientId={setClientId} />
					</FormControl>
				</Grid>

				<br />
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="billType">Forma de pagamento</FormLabel>
						<Select id="billType" value={billingType} onChange={(e) => setBillingType(e.target.value)}>
							<option>Selecione a forma de pagamento</option>
							{options.map((option, index) => (
								<option key={index} value={option}>
									{option}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="phone">Valor da cobrança</FormLabel>
						<Input id="billValue" type="number" onChange={handleBillType} placeholder="R$0,00" />
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="parcel">Parcelas</FormLabel>
						<Select id="parcel" onChange={(e) => setInstallment(Number(e.target.value))}>
							{parcelas.map((x) => (
								<option key={x.value[0]} value={x.value}>
									{x.label}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="dueDate">Vencimento da cobrança</FormLabel>
						<Input id="dueDate" type="date" onChange={(e) => setDueDate(e.target.value)} />
					</FormControl>
				</Grid>
				<br />
				<Box display={'flex'} maxH={'35px'} marginBottom={'15px'}>
					<Text fontSize="2xl" alignSelf={{ sm: 'center', md: 'left' }}>
						Juros e multa
					</Text>
				</Box>
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="feesMonth">juros ao mês</FormLabel>
						<Input
							id="feesMonth"
							onChange={(e) => {
								setFeesMonth(e.target.value.replace(',', '.'));
							}}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="fixedFeesValue">Valor fixo de juros ao mês</FormLabel>
						<Input id="fixedFeesValue" value={formatCurrency(feeMonthPercent)} disabled />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="fixedFeesValue">Multa por atraso</FormLabel>
						<Select id="fixedFeesValue" value={lateFee} onChange={(e) => setLateFeeType(e.target.value)}>
							<option>Valor fixo</option>
							<option>Percentual</option>
						</Select>
					</FormControl>
				</Grid>
				<br />
				{lateFee === 'Percentual' ? (
					<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
						<FormControl>
							<FormLabel htmlFor="percentualFeesValue">Valor percentual da multa</FormLabel>
							<Input
								id="percentualFeesValue"
								onChange={(e) => setFee(Number(e.target.value))}
								placeholder="R$ 0,00"
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="fixedFeesValue">Valor fixo da multa</FormLabel>
							<Input id="fixedFeesValue" value={formatCurrency(assessmentPercent)} disabled />
						</FormControl>
					</Grid>
				) : (
					<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
						<FormControl>
							<FormLabel htmlFor="fixedFeesValue">Valor fixo da multa</FormLabel>
							<Input
								id="fixedFeesValue"
								onChange={(e) => setFee(Number(e.target.value))}
								placeholder="R$ 0,00"
							/>
						</FormControl>
					</Grid>
				)}
				<br />
				<br />
				<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} marginBottom={'15px'}>
					<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
						Desconto
					</Text>
				</Box>
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="discountType">Desconto</FormLabel>
						<Select
							id="discountType"
							value={discountType}
							onChange={(e) => setDiscountType(e.target.value)}
						>
							<option>Valor fixo</option>
							<option>Percentual</option>
						</Select>
					</FormControl>
				</Grid>
				<br />
				{discountType === 'Percentual' ? (
					<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
						<FormControl>
							<FormLabel htmlFor="percentDiscount">Valor percentual do desconto</FormLabel>
							<Input id="percentDiscount" onChange={(e) => setDiscount(Number(e.target.value))} />
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="fixedDiscount">Valor fixo do desconto</FormLabel>
							<Input id="fixedDiscount" value={formatCurrency(discountPercent)} disabled />
						</FormControl>
					</Grid>
				) : (
					<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
						<FormControl>
							<FormLabel htmlFor="fixedDiscount2">Valor fixo do desconto</FormLabel>
							<Input
								id="fixedDiscount2"
								onChange={(e) => setDiscount(Number(e.target.value))}
								placeholder="R$ 0,00"
							/>
						</FormControl>
					</Grid>
				)}
				<br />

				<FormControl>
					<FormLabel>Descrição</FormLabel>
					<Textarea value={chargedescription} onChange={(e) => setChargeDescription(e.target.value)} />
				</FormControl>
				<br />
				<FormControl>
					<Checkbox onChange={(e) => setPostalService(e.target.checked)}>
						Enviar Boleto pelo correio?
					</Checkbox>
				</FormControl>
				<br />
				<br />
				<Button
					marginBottom={'20px'}
					bg="brand.red"
					w="100%"
					onClick={installment > 0 ? handleParcelCharge : handleCashCharge}
					type="submit"
				>
					Adicionar cobrança
				</Button>
			</form>
		</Fragment>
	);
}
