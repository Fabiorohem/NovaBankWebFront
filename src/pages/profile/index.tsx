import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Text, Button, CloseButton, FormControl, FormLabel, HStack, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure } from "@chakra-ui/react";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

const AtualizarSenha = ({ isOpen, onClose }) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');

    const { handleSubmit, register, formState: { errors }, getValues, reset } = useForm();

    const handleCreateUser = async (data) => {

        const { password, newPassword, newPasswordConfirmation } = data;

        try {
            await api.patch(`password`, {
                password, newPassword, newPasswordConfirmation
            })

            setSucessMessage('criado')
            reset();
        } catch (error) {
            let errorMessage = "";
            console.log(error.response)
            error.response?.data?.forEach(x => { errorMessage += "" + x + " " });

            setErrorMessage(!errorMessage ? "Opps Algo deu errado!" : errorMessage)
        }

    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} onClose={() => { onClose(); }} motionPreset={'slideInBottom'} size={'xl'}>
                <ModalOverlay />
                <ModalContent width={'100%'}>
                    <ModalHeader>Novo usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage && (
                            <Alert status="error" variant="solid">
                                <AlertIcon />
                                <AlertTitle mr={2}>Ação não disponível!</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                                <CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
                            </Alert>
                        )}
                        {sucessMessage && (
                            <Alert status="success" variant="solid">
                                <AlertIcon />
                                <AlertTitle mr={2}>Atualizado com sucesso</AlertTitle>
                                <CloseButton onClick={() => setSucessMessage('')} position="absolute" right="10px" />
                            </Alert>
                        )}
                        <form style={{ width: '100%', maxWidth: 1200, paddingLeft: '2%', paddingRight: '4%' }} onSubmit={handleSubmit(handleCreateUser)}>
                            <FormControl>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <Input type={'password'} {...register('password', { required: true })} />
                                {errors.password?.type === 'required' && (<Text color='red.500'> A Senha é obrigatória</Text>)}
                                {errors.password?.type === 'pattern' && (<Text color='red.500'> Senha fora do padrão, exemplo: P@ssword123</Text>)}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                                <Input  {...register('newPassword', { required: true })} />
                                {errors.newPassword?.type === 'required' && (<Text color='red.500'> A Senha é obrigatória</Text>)}
                                {errors.newPassword?.type === 'pattern' && (<Text color='red.500'> Senha fora do padrão, exemplo: P@ssword123</Text>)}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="newPasswordConfirmation">Confirmação</FormLabel>
                                <Input  {...register('newPasswordConfirmation', {
                                    required: true,
                                    validate: (record) => {
                                        return record === getValues("newPassword");
                                    }
                                })} />
                                {errors.newPasswordConfirmation?.type === 'required' && (<Text color='red.500'> A Confirmação é obrigatória</Text>)}
                                {errors.newPasswordConfirmation?.type === 'validate' && (<Text color='red.500'> As senhas são diferentes</Text>)}
                            </FormControl>
                            <br></br>
                            <br></br>
                            <Button marginBottom={'20px'} bg="brand.red" w="100%" type="submit">
                                Atualizar Senha
                            </Button>
                        </form>



                    </ModalBody>

                </ModalContent>
            </Modal>
        </Fragment>
    );
}


const Profile = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');
    const [user, setUser] = useState(undefined);

    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        api.get('profile').then(({ data }) => setUser(data))
    }, [])

    const handleUpdate = async (event) => {

        event.preventDefault();


        const newValue = {
            email: user.email
        };

        try {
            await api.put(`profile`, newValue)
            setSucessMessage("OK")

        } catch (error) {
            let errorMessage = "";
            error.response?.data?.errors?.forEach(x => { errorMessage += "" + x.description + " " });

            setErrorMessage(!errorMessage ? "Ops Algo deu errado!" : errorMessage)
        }
    }

    return (
        <>
            {user &&
                <Fragment>
                    <Box style={{ width: '100%', maxWidth: 1200, paddingLeft: '2%', paddingRight: '4%' }}>
                        {errorMessage && (
                            <Alert status="error" variant="solid">
                                <AlertIcon />
                                <AlertTitle mr={2}>Ação não disponível!</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                                <CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
                            </Alert>)}
                        {sucessMessage && (
                            <Alert status="success" variant="solid">
                                <AlertIcon />
                                <AlertTitle mr={2}>Atualizado com sucesso</AlertTitle>
                                <CloseButton onClick={() => setSucessMessage('')} position="absolute" right="10px" />
                            </Alert>
                        )}
                        <FormControl>
                            <FormLabel htmlFor="name">Login</FormLabel>
                            <Input
                                id="login"
                                value={user.userName}
                                disabled={true}
                            />
                        </FormControl>
                        <br></br>

                        <HStack alignItems={'flex-end'}>
                            <FormControl>
                                <FormLabel htmlFor="name">Email</FormLabel>
                                <Input
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </FormControl>
                            <Button marginBottom={'20px'} bg="agiliza.purple" w="100%" type="submit" onClick={handleUpdate}>
                                Atualizar email
                            </Button>
                        </HStack>
                        <br></br>
                        <HStack alignItems={'flex-end'}>
                            <FormControl>
                                <FormLabel htmlFor="name">Senha</FormLabel>
                                <Input
                                    id="senha"
                                    value={"*********"}
                                    disabled={true}
                                />
                            </FormControl>
                            <Button marginBottom={'20px'} bg="agiliza.purple" w="100%" type="submit" onClick={onOpen}>
                                Atualizar senha
                            </Button>
                        </HStack>




                        <br></br>

                    </Box>
                    <AtualizarSenha isOpen={isOpen} onClose={onClose} />
                </Fragment>
            }

        </>

    );
};


export default Profile;