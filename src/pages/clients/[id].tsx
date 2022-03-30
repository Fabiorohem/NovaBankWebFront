import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { useClient } from '../../hooks/useClients';
import { api } from '../../services/api';
import styles from './styles.module.scss';

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Grid,
	Stack,
	Button,
	Box,
	Text,
	Icon
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useLoading } from '../../hooks/useLoading';
import { getAPIClient } from '../../services/axios';
import { parseCookies } from 'nookies';

export default function Clients({ data }) {
	const client = data;
	const route = useRouter();
	const { updateClient } = useClient();

	const options = [ { label: 'Física', value: 'Física' }, { label: 'Jurídica', value: 'Jurídica' } ];

	const notificationMapping = {
		PAYMENT_OVERDUE: 'Pagamento vencido',
		PAYMENT_CREATED: 'Cobrança criada',
		PAYMENT_RECEIVED: 'Cobrança recebida',
		PAYMENT_UPDATED: 'Cobrança atualizada',
		SEND_LINHA_DIGITAVEL: 'Enviar linha digitável'
	};

	interface ClientNotificationProps {
		id: string;
		event: string;
		scheduleOffset: number;
	}

	const [ clientName, setClientName ] = useState(client.name);
	const [ clientEmail, setClientEmail ] = useState(client.email);
	const [ clientMobilePhone, setClientMobilePhone ] = useState(client.mobilePhone);
	const [ clientCpfCnpj, setClientCpfCnpj ] = useState(client.cpfCnpj);
	const [ clientPostalCode, setClientPostalCode ] = useState(client.postalCode);
	const [ clientPersonType, setClientPersonType ] = useState(client.personType);
	const [ clientAddress, setClientAddress ] = useState(client.address);
	const [ clientAddressNumber, setClientAddressNumber ] = useState(client.addressNumber);
	const [ clientComplement, setClientComplement ] = useState(client.complement);
	const [ clientProvince, setClientProvince ] = useState(client.province);
	const [ clientCity, setClientCity ] = useState(client.city);
	const [ clientState, setClientState ] = useState(client.state);
	const [ clientCountry, setClientCountry ] = useState(client.country);
	const [ clientObservations, setClientObservations ] = useState(client.observations);
	const [ clientNotification, setClientNotification ] = useState([]);

	// useEffect(
	// 	() => {
	// 		function getNotifications(id) {
	// 			api.get(`/cliente/${id}/notificacoes`).then((response) => {
	// 				setClientNotification(response.data.data);
	// 			});
	// 		}
	// 		getNotifications(client.id);
	// 	},
	// 	[ client.id ]
	// );

	function handleUpdateClient(event: FormEvent) {
		event.preventDefault();

		const newData = {
			name: clientName,
			email: clientEmail,
			cpfCnpj: clientCpfCnpj,
			mobilePhone: clientMobilePhone,
			personType: clientPersonType,
			postalCode: clientPostalCode,
			address: clientAddress,
			addressNumber: clientAddressNumber,
			complement: clientComplement,
			province: clientProvince,
			city: clientCity,
			state: clientState,
			country: clientCountry,
			observations: clientObservations
		};

		updateClient(client.id, newData);
		route.push('/clients');
	}

	return (
		<Fragment>
			<Box display={'flex'} maxH={'35px'}>
				<Icon width="1.8rem" height="1.8rem" paddingTop={'2'} color={'brand.red'} as={RiSearchLine} />
				<Text
					fontSize="3xl"
					display={'flex'}
					alignSelf={'flex-start'}
					color={'white'}
					paddingLeft={'10px'}
					paddingBottom={'10px'}
				>
					Atualizar Cliente
				</Text>
			</Box>
			<form style={{ width: '100%', maxWidth: 1120, paddingLeft: '2%', paddingRight: '4%' }}>
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="nome">Nome</FormLabel>
						<Input id="nome" value={clientName} onChange={(e) => setClientName(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							id="email"
							type="email"
							value={clientEmail}
							onChange={(e) => setClientEmail(e.target.value)}
						/>
					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="phone">Celular</FormLabel>
						<Input
							id="phone"
							type="tel"
							value={clientMobilePhone}
							onChange={(e) => setClientMobilePhone(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="cpfCnpj">CPF ou CNPJ</FormLabel>
						<Input id="cpfCnpj" value={clientCpfCnpj} onChange={(e) => setClientCpfCnpj(e.target.value)} />
					</FormControl>
					{/* <FormControl>
					<FormLabel htmlFor='tipoPessoa'>Tipo Pessoa</FormLabel>
					<RadioGroup id="tipoPessoa" w="100%" onChange={setClientPersonType} value={clientPersonType}>
						<Stack spacing={4} direction='row'>
							<Radio value='FISICA'>Física</Radio>
							<Radio value='JURIDICA'>Jurídica</Radio>
						</Stack>
					</RadioGroup>
				</FormControl> */}
				</Grid>
				<br />
				<br />
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="cep">CEP</FormLabel>
						<Input
							id="cep"
							value={clientPostalCode}
							onChange={(e) => setClientPostalCode(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="pais">País</FormLabel>
						<Input id="pais" value={clientCountry} onChange={(e) => setClientCountry(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="estado">Estado</FormLabel>
						<Input id="estado" value={clientState} onChange={(e) => setClientState(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="city">Cidade</FormLabel>
						<Input id="city" value={clientCity} onChange={(e) => setClientCity(e.target.value)} />
					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
					<FormControl>
						<FormLabel htmlFor="bairro">Bairro</FormLabel>
						<Input id="bairro" value={clientProvince} onChange={(e) => setClientProvince(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="rua">Rua</FormLabel>
						<Input id="rua" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="numero">Numero</FormLabel>
						<Input
							id="numero"
							type="number"
							value={clientAddressNumber}
							onChange={(e) => setClientAddressNumber(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="complemento">Complemento</FormLabel>
						<Input
							id="complemento"
							value={clientComplement}
							onChange={(e) => setClientComplement(e.target.value)}
						/>
					</FormControl>
				</Grid>
				<br />
				<br />
				<FormControl>
					<FormLabel htmlFor="obs">Observacoes</FormLabel>
					<Input
						id="obs"
						value={clientObservations}
						onChange={(e) => setClientObservations(e.target.value)}
					/>
				</FormControl>
				<br />
				<br />
				<Button bg="brand.red" w="100%" marginBottom={4} onClick={handleUpdateClient} type="submit">
					Atualizar Cliente
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

	const { data } = await apiClient.get(`/Cliente/${ctx.params.id}`);

	return { props: { data } };
};
