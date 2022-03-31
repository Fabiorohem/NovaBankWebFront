import { Box, Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { api } from "../../services/api";



interface UserInterface {
    configurationId: string,
    id: string,
    userName: string,
    email: string
}

export const AccountUsersModal = ({ accountId, isOpen, onClose }) => {
    const [users, setUser] = useState(null as UserInterface[])

    useEffect(() => {
        if(accountId)
            api.get<UserInterface[]>(`account/${accountId}/users`).then((response) => setUser(response.data))
    }, [accountId])

    const handleDelete = async (id) => {
        try{
            await api.delete(`user/${id}`);
            setUser(null);
            onClose();
        }catch {
            alert('Erro ao deletar! Tente novamente mais tarde')
        }
      
    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} onClose={() => { setUser(null); onClose(); }} motionPreset={'slideInBottom'} size={'xl'}>
                <ModalOverlay />
                <ModalContent width={'100%'}>
                    <ModalHeader>Usuários</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {users && (
                            <Box width={{ base: '100%' }}  overflowX={{ sm: 'scroll' }}>
                                <Table variant="simple" colorScheme="blue" size={'sm'}>
                                    <Thead>
                                        <Tr>
                                            <Th>Login</Th>
                                            <Th>Email</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {users.map((user) => {
                                            return (
                                                <Tr key={user.id}>
                                                    <Td>{user.userName}</Td>
                                                    <Td>{user.email}</Td>
                                                    <Td>
                                                        <Tooltip label="Excluir usuário" shouldWrapChildren>
                                                            <Icon
                                                                width={4}
                                                                height={4}
                                                                mr={2}
                                                                ml={0}
                                                                as={MdDelete}
                                                                onClick={() => {
                                                                    handleDelete(user.id)
                                                                }}
                                                                cursor={'pointer'}
                                                            />
                                                        </Tooltip>
                                                    </Td>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                </Table>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};
