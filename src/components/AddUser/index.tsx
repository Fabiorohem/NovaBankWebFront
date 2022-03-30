import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Text, Button, CloseButton, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";



interface UserInterface {
    configurationId: string,
    id: string,
    userName: string,
    email: string
}

export const AddUser = ({ accountId, isOpen, onClose }) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');

    const { handleSubmit, register, formState: { errors }, getValues,reset} = useForm();

    const handleCreateUser = async (data) => {
        console.log(data);
        const {username,password,email } = data;

        try {
            await api.post(`account/${accountId}/users`, {
                username,password,email
            })

            setSucessMessage('criado')
            reset();
        }catch(error) {
            let errorMessage = "";
            error.response?.data?.errors?.forEach(x =>{ errorMessage += "" + x.description + " "});
            
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
                                <AlertTitle mr={2}>Criado com sucesso</AlertTitle>
                                <CloseButton onClick={() => setSucessMessage('')} position="absolute" right="10px" />
                            </Alert>
                        )}
                        <form style={{ width: '100%', maxWidth: 1120, paddingLeft: '2%', paddingRight: '4%' }} onSubmit={handleSubmit(handleCreateUser)}>
                            <FormControl>
                                <FormLabel htmlFor="username">Login</FormLabel>
                                <Input {...register('username', { required: true })} />
                                {errors.username?.type === 'required' && (<Text color='red.500'> O login é obrigatório</Text>)}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input {...register('email', { required: true })} />
                                {errors.email?.type === 'required' && (<Text color='red.500'> O email é obrigatório</Text>)}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <Input  {...register('password', { required: true })} />
                                {errors.password?.type === 'required' && (<Text color='red.500'> A Senha é obrigatória</Text>)}
                                {errors.password?.type === 'pattern' && (<Text color='red.500'> Senha fora do padrão, exemplo: P@ssword123</Text>)}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="confirmation">Confirmação</FormLabel>
                                <Input {...register('confirmation', {
                                    required: true,
                                    validate: (record) => {
                                        return record === getValues("password");
                                    }
                                })} />
                                {errors.confirmation?.type === 'required' && (<Text color='red.500'> A Senha é obrigatória</Text>)}
                                {errors.confirmation?.type === 'validate' && (<Text color='red.500'> As senhas são diferentes</Text>)}
                            </FormControl>
                            <br></br>
                            <br></br>
                            <Button marginBottom={'20px'} bg="brand.red" w="100%" type="submit">
                                Adicionar Conta
                            </Button>
                        </form>



                    </ModalBody>

                </ModalContent>
            </Modal>
        </Fragment>
    );
};
