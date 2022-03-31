import {
	Stack,
	FormControl,
	Text,
	FormLabel,
	Tooltip,
	Input,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	useColorModeValue,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
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
	CloseButton,
	Icon,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useClient } from '../../hooks/useClients';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

import { FcCheckmark } from 'react-icons/fc';

interface ClientProps {
	id: string;
	email: string;
	name: string;
	mobilePhone: string;
	cpfCnpj: string;
}

const RenderActionButtons = ({ props }) => {
	const { setFilters, setClientOffset } = useClient();
	return (
		<Fragment>
			<Tooltip label="Selecionar" shouldWrapChildren>
				<Icon
					width={5}
					height={5}
					mr={4}
					ml={8}
					color={'agiliza.purple'}
					as={FcCheckmark}
					onClick={() => {
						setTimeout(() => {
							setFilters({
								name: '',
								cpfCnpj: ''
							});
							setClientOffset(0);
						}, 2000);

						props.setClientId(props.id);
						props.onClose();
					}}
					cursor={'pointer'}
				/>
			</Tooltip>
		</Fragment>
	);
};

const Filters = ({ onOpen }) => {
	const { setFilters } = useClient();
	const [ name, setName ] = useState('');
	const [ cpfCnpj, setCpfCnpj ] = useState('');

	return (
		<Fragment>
			<Stack spacing={4} direction="column" align="flex-start">
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
					<Button
						colorScheme="purple"
						variant="outline"
						onClick={() => {
							setFilters({
								name: '',
								cpfCnpj: ''
							});
						}}
					>
						Limpar Filtros
					</Button>
				</Stack>
			</Stack>
		</Fragment>
	);
};

const Clients = ({ setClientId, onClose, onOpen }) => {
	const { clients } = useClient();
	const [ filters, setFilters ] = useState('none');

	function handleToggleFilters() {
		if (filters === 'none') {
			setFilters('block');
		} else {
			setFilters('none');
		}
	}
	return (
		<Fragment>
			<VStack>
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
					<Filters onOpen={onOpen} />
				</Box>
				<Box width={{ base: '100%' }}  overflowX={{ sm: 'scroll' }}>
					<Table variant="simple" colorScheme="blue" size={'sm'}>
						<Thead>
							<Tr>
								<Th>Nome</Th>
								<Th>Cpf/Cnpj</Th>
								<Th>Actions</Th>
							</Tr>
						</Thead>
						<Tbody>
							{clients.map((client: ClientProps) => {
								return (
									// border={'inset'}  borderBlockEndColor={"revert"} borderBlockStartColor={"revert"}
									<Tr key={client.id}>
										<Td>{client.name}</Td>

										<Td>{client.cpfCnpj}</Td>
										<Td>
											<RenderActionButtons
												props={{
													id: client.id,
													onClose,
													setClientId
												}}
											/>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</Box>
			</VStack>
		</Fragment>
	);
};

export const SearchClient = ({ setClientId }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { setFilters, setClientOffset } = useClient();

	function handleClose() {
		setTimeout(() => {
			setFilters({
				name: '',
				cpfCnpj: ''
			});
			setClientOffset(0);
		}, 2000);
		onClose();
	}

	return (
		<Fragment>
			<Button onClick={onOpen} colorScheme="blue" marginTop={8}>
				{' '}
				Buscar Cliente
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset={'slideInBottom'} size={'xl'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>Buscar Cliente</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Clients setClientId={setClientId} onClose={onClose} onOpen={handleClose} />
					</ModalBody>
					<ModalFooter>
						<Pagination />
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>
	);
};

export default function Pagination() {
	const iconColor = useColorModeValue('black', 'white');

	let offset: number;

	const { setClientOffset, clientReponse } = useClient();
	const clientTotalCount = clientReponse.totalCount;
	const clientHasMore = clientReponse.hasMore;
	const clientOffset = clientReponse.offsetState;

	const itensPerPage = 10;

	function handleSetNextOffset(offset, itensPerPage) {
		setClientOffset(offset + itensPerPage);
	}

	function handleSetPreviousOffset(offset, itensPerPage) {
		setClientOffset(offset - itensPerPage);
	}

	return (
		<Stack display={'flex'} direction={'row'} width={'100%'} justifyContent={'end'} height={'100%'}>
			{clientOffset && (
				<Fragment>
					<Icon
						width={5}
						height={5}
						mr={4}
						ml={8}
						as={MdSkipPrevious}
						onClick={() => handleSetPreviousOffset(clientOffset, itensPerPage)}
						cursor={'pointer'}
					/>
				</Fragment>
			)}

			<Text>
				{clientOffset}
				{clientTotalCount ? ` - ${clientTotalCount}` : ''}
			</Text>

			{clientHasMore && (
				<Icon
					width={5}
					height={5}
					mr={4}
					ml={8}
					as={MdSkipNext}
					color={iconColor}
					onClick={() => handleSetNextOffset(clientOffset, itensPerPage)}
					cursor={'pointer'}
				/>
			)}
		</Stack>
	);
}
