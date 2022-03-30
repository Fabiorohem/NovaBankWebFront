import {
	useDisclosure,
	Modal,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	ModalOverlay,
	Button,
	ModalBody,
	ModalHeader,
	FormControl,
	FormLabel,
	Input,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Icon,
	Tooltip,
	Box
} from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { Fragment, useState } from 'react';
import { FaEbay } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import clients from '../../pages/clients';

import JsonBank from '../../services/bancos.json';
import DefaultBanks from '../../services/defaultBanks.json';

const RenderActionButtons = ({ props }) => {
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
						props.setCode(props.id);
						props.onClose();
						props.setBanksFounds(DefaultBanks);
					}}
					cursor={'pointer'}
				/>
			</Tooltip>
		</Fragment>
	);
};

const Search = ({ setCode, onClose }: Props) => {
	const [ banksFounds, setBanksFounds ] = useState(DefaultBanks);

	return (
		<Fragment>
			<FormControl>
				<FormLabel htmlFor="bank">Nome do Banco</FormLabel>
				<Input
					mb={{ sm: 8 }}
					placeholder="Banco Safra"
					id="bank"
					onChange={(event) => {
						if (!!event.target.value) {
							const founds = JsonBank.filter((bank) =>
								bank.fullName.toUpperCase().includes(event.target.value.toUpperCase())
							);
							setBanksFounds(founds);
						} else {
							setBanksFounds(DefaultBanks);
						}
					}}
				/>
			</FormControl>
			<Box width={{ base: '100%' }} maxW={1200} overflowX={{ sm: 'scroll' }}>
				<Table variant="simple" colorScheme="blue" size={'sm'}>
					<Thead>
						<Tr>
							<Th>Nome do Banco</Th>
							<Th>Codico</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{banksFounds.map((bank) => {
							return (
								<Tr key={bank.code}>
									<Td>{bank.fullName}</Td>
									<Td>{bank.code}</Td>
									<Td>
										<RenderActionButtons
											props={{
												id: bank.code,
												onClose,
												setCode,
												setBanksFounds
											}}
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Fragment>
	);
};

export const SearchBanco = ({ setCode }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Fragment>
			<Button onClick={onOpen} colorScheme="blue" mt={{ sm: 0, md: 0, xl: 8 }} mb={{ sm: 4, md: 4, xl: 0 }}>
				{' '}
				Buscar Banco
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset={'slideInBottom'} size={'xl'}>
				<ModalOverlay />
				<ModalContent width={'100%'}>
					<ModalHeader>Buscar Banco</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Search setCode={setCode} onClose={onClose} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} colorScheme="blue">
							{' '}
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>
	);
};
