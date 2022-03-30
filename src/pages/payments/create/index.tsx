import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CloseButton,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Text,
	Textarea
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, Fragment, useState } from 'react';
import { usePayment } from '../../../hooks/usePayment';

export default function Create() {
	const [ identificationField, setIdentificationField ] = useState('');
	const [ scheduleDate, setScheduleDate ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ discount, setDiscount ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ value, setValue ] = useState('');

	const route = useRouter();
	const { createNewPayment, errorMessage, setErrorMessage } = usePayment();

	function handleCreatePayment(event: FormEvent) {
		event.preventDefault();
		const newValue = {
			identificationField,
			scheduleDate,
			description,
			discount: Number(discount),
			dueDate,
			value: Number(value)
		};
		createNewPayment(newValue);
		route.push('/payments');
	}

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
				Adicionar pagamento
			</Text>
			<form style={{ width: '100%', maxWidth: 1200, paddingLeft: '2%', paddingRight: '4%' }}>
				<Grid
					templateColumns={{
						sm: 'repeat(1, 1fr)',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(2, 1fr)',
						xl: 'repeat(3, 1fr)'
					}}
					gap={6}
				>
					<FormControl>
						<FormLabel htmlFor="identificationField">Linha digitável do boleto</FormLabel>
						<Input
							placeholder="03399.77779 29900.000000 04751.101017 1 81510000002990"
							onChange={(e) => setIdentificationField(e.target.value)}
							id="identificationField"
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="scheduleDate">Data de agendamento do pagamento</FormLabel>
						<Input id="scheduleDate" type="date" onChange={(e) => setScheduleDate(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="dueDate">Data de vencimento </FormLabel>
						<Input id="dueDate" type="date" onChange={(e) => setDueDate(e.target.value)} />
					</FormControl>
				</Grid>
				<br />
				<Grid
					templateColumns={{
						sm: 'repeat(1, 1fr)',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(2, 1fr)',
						xl: 'repeat(2, 1fr)'
					}}
					gap={6}
				>
					<FormControl>
						<FormLabel htmlFor="value">Valor</FormLabel>
						<Input
							id="value"
							type="text"
							placeholder="1000,00"
							onChange={(e) => setValue(e.target.value.replace(',', '.'))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="discount">Desconto (se houver)</FormLabel>
						<Input
							id="discount"
							type="text"
							placeholder="0,50"
							onChange={(e) => setDiscount(e.target.value.replace(',', '.'))}
						/>
					</FormControl>
				</Grid>
				<Grid templateColumns="repeat(1, 1fr)" gap={6}>
					<FormControl>
						<FormLabel htmlFor="description">Descrição</FormLabel>
						<Textarea id="description" onChange={(e) => setDescription(e.target.value)} />
					</FormControl>
				</Grid>
				<br />
				<Button marginBottom={'20px'} bg="agiliza.purple" w="100%" type="submit" onClick={handleCreatePayment}>
					Adicionar pagamento
				</Button>
			</form>
		</Fragment>
	);
}
