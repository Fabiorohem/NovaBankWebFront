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
	Icon,
	Select,
	Textarea,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Stack,
	InputGroup,
	InputRightElement,
	Checkbox
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useClient } from '../../hooks/useClients';
import { useCharge } from '../../hooks/useCharge';
import { getAPIClient } from '../../services/axios';
import { parseCookies } from 'nookies';

export default function Charges({ data }) {
	const options = [ 'Boleto Bancário', 'Cartão de Crédito', 'Pix', 'Pergunte ao Cliente' ];

	const chargeBillTypeMapping = {
		BOLETO: 'Boleto Bancário',
		CREDIT_CARD: 'Cartão de Crédito',
		PIX: 'Pix',
		UNDEFINED: 'Pergunte ao Cliente'
	};

	const chargeUpdateBillTypeMapping = {
		'Boleto Bancário': 'BOLETO',
		'Cartão de Crédito': 'CREDIT_CARD',
		Pix: 'PIX',
		'Pergunte ao Cliente': 'UNDEFINED'
	};

	const lateFeeTypeMapping = {
		Percentual: 'PERCENTAGE',
		'Valor fixo': 'FIXED'
	};

	const charge = data;
	const route = useRouter();

	const { updateCharge } = useCharge();
	const [ clientId, setClientId ] = useState(charge.customer);
	const [ billingType, setBillingType ] = useState(chargeBillTypeMapping[charge.billingType]);
	const [ billValue, setBillType ] = useState(charge.value);
	const [ postalService, setPostalService ] = useState(false);
	const [ dueDate, setDueDate ] = useState(charge.dueDate);
	const [ lateFee, setLateFeeType ] = useState('');

	const [ fee, setFee ] = useState(0);
	const [ discount, setDiscount ] = useState(0);
	const [ discountType, setDiscountType ] = useState('');

	const [ installment, setInstallment ] = useState(0);

	const [ feesMonth, setFeesMonth ] = useState('');
	const [ chargeDescription, setChargeDescription ] = useState('');
	
	function toggleChange() {
		setPostalService(!postalService);
	}

	const [ parcelas, setParcelas ] = useState([
		{
			value: 0,
			label: 'A vista'
		}
	]);

	const formatCurrency = (value) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value);
	};

	function handleUpdateCharge(event: FormEvent) {
		event.preventDefault();

		const newData = {
			customer: clientId,
			billingType: chargeUpdateBillTypeMapping[billingType],
			value: billValue,
			dueDate,
			description: chargeDescription,
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

		updateCharge(charge.id, newData);
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
			description: chargeDescription,
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
			}
		};

		updateCharge(newData);
		route.push('/charges');
	}

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
					label: `${parcVal} de (${formatCurrency(Number(valLabParc))})`
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
			<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'}>
				<Text fontSize="3xl" display={'flex'} alignSelf={'flex-start'} paddingBottom={'10px'}>
					Editar cobrança
				</Text>
			</Box>

			<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} paddingTop={'15px'}>
				<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
					Dados da Cobrança
				</Text>
			</Box>
			<form style={{ width: '100%' }}>
				<Grid templateColumns="repeat(2, 1fr)" gap={6}>
					<FormControl>
						<FormLabel>Cliente</FormLabel>
						<Input
							value={clientId}
							disabled
							onChange={(e) => setClientId(e.target.value)}
							placeholder="cus_000028303088"
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="billType">Forma de pagamento</FormLabel>
						<Select id="billType" value={billingType} onChange={(e) => setBillingType(e.target.value)}>
							<option>Selecione a forma de pagamento</option>
							{options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns="repeat(4, 1fr)" gap={6}>
					<FormControl>
						<FormLabel htmlFor="phone">Valor da cobrança</FormLabel>
						<Input
							id="billValue"
							type="number"
							value={billValue}
							onChange={(e) => setBillType(e.target.value)}
							placeholder="R$0,00"
						/>
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
				<Grid templateColumns="repeat(4, 1fr)" gap={6}>
					<FormControl>
						<FormLabel htmlFor="dueDate">Vencimento da cobrança</FormLabel>
						<Input id="dueDate" value={dueDate} type="date" onChange={(e) => setDueDate(e.target.value)} />
					</FormControl>
				</Grid>
				<br />
				<Box display={'flex'} alignSelf={'flex-start'} maxH={'35px'} marginBottom={'15px'}>
					<Text fontSize="2xl" display={'flex'} alignItems={'left'}>
						Juros e multa
					</Text>
				</Box>
				<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
				<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
					<Textarea value={chargeDescription} onChange={(e) => setChargeDescription(e.target.value)} />
				</FormControl>
				<br />
				<FormControl>
					<Checkbox onChange={toggleChange} checked={postalService}>
						Enviar Boleto pelo correio?
					</Checkbox>
				</FormControl>
				<br />
				<Button
					onClick={installment > 0 ? handleParcelCharge : handleUpdateCharge}
					marginBottom={'20px'}
					bg="agiliza.purple"
					w="100%"
					type="submit"
				>
					Editar cobrança
				</Button>
			</form>
		</Fragment>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiClient = getAPIClient(ctx);
	const { ['nextauth.token']: token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	const { data } = await apiClient.get(`/Cobranca/${ctx.params.id}`);

	return { props: { data } };
};
