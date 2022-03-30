import { Fragment, useState } from 'react';
import { useClient } from '../../hooks/useClients';
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
	Tfoot,
	Tooltip,
	Alert,
	AlertDescription,
	CloseButton,
	AlertIcon,
	AlertTitle
} from '@chakra-ui/react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import Pagination from '../../components/Pagination';
import { useLoading } from '../../hooks/useLoading';
import { GetServerSideProps } from 'next';

interface ClientProps {
	id: string;
	email: string;
	name: string;
	mobilePhone: string;
	cpfCnpj: string;
}

const RenderActionButtons = ({ props }) => {
	return (
		<Fragment>
			<Link href={`clients/${props.id}`} passHref>
				<a>
					<Tooltip label="Editar" shouldWrapChildren>
						<Icon width={5} height={5} mr={2} ml={2} as={FaUserEdit} cursor={'pointer'} />
					</Tooltip>
				</a>
			</Link>
			<Tooltip label="Deletar" shouldWrapChildren>
				<Icon
					width={5}
					height={5}
					mr={2}
					ml={2}
					color={'agiliza.purple'}
					as={MdDelete}
					onClick={() => {
						props.setClientId(props.id);
						props.onOpen();
					}}
					cursor={'pointer'}
				/>
			</Tooltip>
		</Fragment>
	);
};

const Filters = () => {
	const { setFilters } = useClient();
	const [ name, setName ] = useState('');
	const [ cpfCnpj, setCpfCnpj ] = useState('');

	function handleCleanInput() {
		const inputName = document.querySelector('#name') as HTMLInputElement;
		const inputCpfCnpj = document.querySelector('#cpfCnpj') as HTMLInputElement;
		inputCpfCnpj.value = '';
		inputName.value = '';
		setCpfCnpj('');
		setName('');
	}

	return (
		<Fragment>
			<Stack spacing={4} direction="column" align="flex-start" width={380}>
				<FormControl>
					<FormLabel htmlFor="name">Nome</FormLabel>
					<Input
						id="name"
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="cpfCnpj">CPF ou CNPJ</FormLabel>
					<Input
						id="cpfCnpj"
						onChange={(event) => {
							setCpfCnpj(event.target.value);
						}}
					/>
				</FormControl>
				<Stack spacing={4} direction="row" align="flex end" alignSelf={'end'}>
					<Button
						colorScheme="blue"
						variant="outline"
						onClick={() => {
							setFilters({
								name,
								cpfCnpj
							});
						}}
					>
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

const Clients = () => {
	const { clients, deleteClient, successMessage, setSuccessMessage, errorMessage, setErrorMessage } = useClient();
	const [ clientId, setClientId ] = useState('');
	const [ filters, setFilters ] = useState('none');
	const { isOpen, onOpen, onClose } = useDisclosure();

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
			<Box display={'flex'} maxH={'35px'}>
				<Icon width="1.8rem" height="1.8rem" paddingTop={'2'} color={'agiliza.purple'} as={RiSearchLine} />
				<Text fontSize="3xl" paddingLeft={'10px'} paddingBottom={'10px'}>
					Buscar Clientes
				</Text>
			</Box>
			{successMessage && (
				<Alert status="success" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
					<AlertDescription>{successMessage}</AlertDescription>
					<CloseButton onClick={() => setSuccessMessage('')} position="absolute" right="8px" top="15px" />
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
			<Button
				style={{
					padding: 2,
					width: 100,
					textAlign: 'center',
					marginLeft: 2
				}}
				colorScheme={'purple'}
				onClick={handleToggleFilters}
			>
				Filtros
			</Button>
			<Box display={filters}>
				<Filters />
			</Box>
			<Box width={{ base: '100%' }} maxW={1200} >
				<Table size={'sm'}>
					<Thead>
						<Tr>
							<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Id</Th>
							<Th>Nome</Th>
							<Th>Cpf/Cnpj</Th>
							<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Email</Th>
							<Th display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>Celular</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{clients.map((client: ClientProps) => {
							return (
								<Tr key={client.id}>
									<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{client.id}</Td>
									<Td>{client.name}</Td>
									<Td>{client.cpfCnpj}</Td>
									<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{client.email}</Td>
									<Td display={{ sm: 'none', md: 'none', lg: 'table-cell' }}>{client.mobilePhone}</Td>
									<Td>
										<RenderActionButtons
											props={{
												id: client.id,
												onOpen,
												setClientId
											}}
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				<Pagination />
			</Box>

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
							colorScheme="agiliza.purple"
							onClick={() => {
								deleteClient(clientId);
								onClose();
							}}
						>
							Deletar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>

		// <Container >

		// </Container>
	);
};

export default Clients;
