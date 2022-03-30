import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Icon, propNames, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { FaUserAlt,FaPlus, FaEdit } from 'react-icons/fa';
import { api } from '../../services/api';
import { AccountUsersModal } from '../../components/AccountUsers';
import { AddUser } from '../../components/AddUser';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Props } from 'framer-motion/types/types';
import { UpdateAccountModal } from '../../components/UpdateAccount';




const RenderActionButtons = ({ props }) => {

	return (
		<Fragment>
			<Tooltip label="listar usuários" shouldWrapChildren>
				<Icon
					width={4}
					height={4}
					mr={2}
					ml={0}
					as={FaUserAlt}
					onClick={() => {
						props.setAccountId(props.id)
						props.onOpen();
					}}
					cursor={'pointer'}
				/>
			</Tooltip>
		
			<Tooltip label="Adicionar Usuário" shouldWrapChildren>
				<Icon
					width={4}
					height={4}
					mr={2}
					ml={0}
					as={FaPlus}
					onClick={() => {
						props.setNewUser(true)
						props.setAccountId(props.id)
						props.onOpen();
					}}
					cursor={'pointer'}
				/>
			</Tooltip>
			<Tooltip label="Configurações" shouldWrapChildren>
				<Icon
					width={4}
					height={4}
					mr={2}
					ml={0}
					as={FaEdit}
					onClick={() => {
						props.setAccount(props.account)
						props.onOpen();
					}}
					cursor={'pointer'}
				/>
			</Tooltip>

		</Fragment>
	);
};

const SplitComponent = ({account}: Props) => {

	console.log(account)

	if(!account.splitFixedValue && !account.percentualValue ) return <p></p>

	if(account.splitFixedValue) return <p>R$ {account.splitFixedValue}</p>
	if(account.percentualValue) return <p>{account.percentualValue}%</p>

	return <p></p>
}

export default function Account() {
	const { accounts, successMessage, errorMessage, setErrorMessage, setSuccessMessage, setAccounts} = useAccount();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [accountId, setAccountId] = useState(undefined);
	const [newUser, setNewUser] = useState(false)
	const [account,setAccount] = useState(null);

	return (

		<Fragment>
			{accountId && !newUser &&
				<AccountUsersModal accountId={accountId} isOpen={isOpen} onClose={() => {setAccountId(undefined);onClose()}} />
			}

			{
				newUser &&
				<AddUser accountId={accountId} isOpen={isOpen} onClose={() => { setNewUser(false); onClose() }} />
			}
			{
				account &&
				<UpdateAccountModal account={account} isOpen={isOpen} onClose={() => { setAccounts([]); setAccount(null); onClose() }}/>
			}

			<Text
				fontSize="3xl"
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				paddingLeft={'10px'}
				paddingBottom={'10px'}
			>
				Lista de contas
			</Text>
			<Box width={{ base: '100%' }} maxW={1200} overflowX={{ sm: 'scroll' }}>
				{errorMessage && (
					<Alert status="error" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
						<AlertIcon />
						<AlertTitle mr={2}>Ação não disponível!</AlertTitle>
						<AlertDescription>{errorMessage}</AlertDescription>
						<CloseButton
							onClick={() => setErrorMessage('')}
							position="absolute"
							right="8px"
							top="8px"
						/>
					</Alert>
				)}
				{successMessage && (
					<Alert status="success" variant="solid" paddingBottom={'22px'} paddingTop={'22px'}>
						<AlertDescription>{successMessage}</AlertDescription>
						<CloseButton
							onClick={() => setSuccessMessage('')}
							position="absolute"
							right="8px"
							top="8px"
						/>
					</Alert>
				)}
				<Table size={'sm'}>
					<Thead>
						<Tr>
							<Th>Conta</Th>
							<Th>WalletId</Th>
							<Th>Split</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{accounts.map((account) => (
							<Tr key={account.id}>
								<Td>{account.name}</Td>
								<Td>{account.walletId}</Td>
								<Td><SplitComponent account={account} /></Td>
								<Td>
									<RenderActionButtons
										props={{
											id: account.id,
											setAccountId,
											onOpen,
											setNewUser,
											setAccount,
											account
										}}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Fragment>
	);
}
