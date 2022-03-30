import { useRouter } from 'next/router';
import { useClient } from '../../../hooks/useClients';

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Grid,
	Stack,
	Button,
	Box,
	Text,
	Icon,
	Input
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

export default function Create() {
	const options = [ { label: 'Física', value: 'Física' }, { label: 'Jurídica', value: 'Jurídica' } ];
	const { createClient } = useClient();
	const { handleSubmit, register, formState: { errors } } = useForm();

	const route = useRouter();

	function handleCreateClient(data) {
		createClient(data);
		route.push('/clients');
	}

	return (
		<Fragment>
			<Box display={'flex'}  maxH={'35px'}>
				<Icon width="1.8rem" height="1.8rem" paddingTop={'2'} color={'agiliza.purple'} as={RiSearchLine} />
				<Text
					fontSize="3xl"
					display={'flex'}
					alignSelf={'flex-start'}
					paddingLeft={'10px'}
					paddingBottom={'10px'}
				>
					Adicionar cliente
				</Text>
			</Box>
			<form style={{ width: '100%', maxWidth: 1120, paddingLeft: '2%', paddingRight: '4%' }} onSubmit={handleSubmit(handleCreateClient)}>
				<Grid templateColumns={{sm: "repeat(1, 1fr)",md:"repeat(2, 1fr)"}} gap={6}>
					<FormControl>
						<FormLabel htmlFor="nome">Nome</FormLabel>
						<Input {...register('name', { required: true })} />
						{errors.name?.type ==='required' && <Text color='red.500'>O nome é obrigatório</Text>}
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input {...register('email', { required: true })} />
						{errors.name?.type ==='required' && <Text color='red.500'>O email é obrigatório</Text>}

					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(2, 1fr)"}} gap={6}>
					<FormControl>
						<FormLabel htmlFor="phone">Celular</FormLabel>
						<Input {...register('mobilePhone', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="cpfCnpj">CPF ou CNPJ</FormLabel>
						<Input {...register('cpfCnpj', { required: true })} />
						{errors.name?.type ==='required' && <Text color='red.500'>O CPF/CNPJ é obrigatório</Text>}

					</FormControl>
					<FormControl>
						<FormLabel htmlFor="tipoPessoa">Tipo Pessoa</FormLabel>
						<RadioGroup id="tipoPessoa" w="100%">
							<Stack spacing={4} direction="row">
								<Radio type="radio" {...register('personType')} value="FISICA">
									Física
								</Radio>
								<Radio type="radio" {...register('personType')} value="JURIDICA">
									Jurídica
								</Radio>
							</Stack>
						</RadioGroup>
					</FormControl>
				</Grid>
				<br />
				<br />
				<Grid templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(4, 1fr)"}} gap={6}>
					<FormControl>
						<FormLabel htmlFor="cep">CEP</FormLabel>
						<Input {...register('postalCode', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="pais">País</FormLabel>
						<Input {...register('country', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="estado">Estado</FormLabel>
						<Input {...register('state', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="city">Cidade</FormLabel>
						<Input {...register('city', { required: false })} />
					</FormControl>
				</Grid>
				<br />
				<Grid templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(4, 1fr)"}}gap={6}>
					<FormControl>
						<FormLabel htmlFor="bairro">Bairro</FormLabel>
						<Input {...register('province', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="rua">Rua</FormLabel>
						<Input {...register('address', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="numero">Numero</FormLabel>
						<Input {...register('addressNumber', { required: false })} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="complemento">Complemento</FormLabel>
						<Input {...register('complement', { required: false })} />
					</FormControl>
				</Grid>
				<br />
				<br />
				<FormControl>
					<FormLabel htmlFor="obs">Observacoes</FormLabel>
					<Input {...register('observations', { required: false })} />
				</FormControl>
				<br />
				<br />
				<Button bg="agiliza.purple" w="100%" marginBottom={4} type="submit">
					Adicionar cliente
				</Button>
			</form>
		</Fragment>
	);
}
