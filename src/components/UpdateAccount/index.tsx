import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
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

export const UpdateAccountModal = ({ account, isOpen, onClose }) => {

    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');

    const [value, setValue] = useState(0);
    const [valueType, setValueType] = useState('Percentual');

    const route = useRouter();

    useEffect(() => {
        if (account) {
            setName(account.name)
            setAgencia(account.agencia ? account.agencia  : '' )
            setConta(account.conta ? account.conta  : '' )

            if (account.percentualValue) {
                setValueType('Percentual')
                setValue(Number(account.percentualValue ?? 0))
            } else {
                setValueType('Fixo')
                setValue(account.splitFixedValue ?? 0)
            }
        }
    }, [account])

    const handleUpdate = async (event) => {

        event.preventDefault();

        let splitConfiguration = {} as any;
        if (valueType === 'Fixo') {
                splitConfiguration.fixedValue = Number(value),
                splitConfiguration.percentValue = null
        } else {
            splitConfiguration.fixedValue = null,
            splitConfiguration.percentValue = Number(value)
        }



        const newValue = {
            name,
            splitConfiguration,
            agencia,
            conta
        };

        try {
            await api.put(`account/${account.id}`, newValue)
            setName('')
            setValue(0)
            setValueType(`Percentual`)
            onClose();
        } catch (error) {
            let errorMessage = "";
            error.response?.data?.errors?.forEach(x =>{ errorMessage += "" + x.description + " "});
            
            setErrorMessage(!errorMessage ? "Ops Algo deu errado!" : errorMessage)
        }
    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} onClose={onClose} motionPreset={'slideInBottom'} size={'xl'}>
                <ModalOverlay />
                <ModalContent width={'100%'}>
                    <ModalHeader>Configurações</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage && (
                            <Alert status="error" variant="solid">
                                <AlertIcon />
                                <AlertTitle mr={2}>Ação não disponível!</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                                <CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
                            </Alert>)}
                        <FormControl>
                            <FormLabel htmlFor="name">Nome</FormLabel>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="valueType">Configuração Split</FormLabel>
                            <Select id="valueType" value={valueType} onChange={(e) => setValueType(e.target.value)}>
                                <option key={0} value={"Fixo"}>Fixo</option>
                                <option key={1} value={"Percentual"}>Percentual</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="value">{`Valor Split ${valueType} `}</FormLabel>
                            <Input
                                id="value"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                placeholder={valueType == "Fixo" ? "R$ 0,00" : "10%"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="agencia">Agência</FormLabel>
                            <Input
                                id="agencia"
                                value={agencia}
                                onChange={(e) => setAgencia(e.target.value)}
                                placeholder={"4521"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="conta">Conta</FormLabel>
                            <Input
                                id="conta"
                                value={conta}
                                onChange={(e) => setConta(e.target.value)}
                                placeholder={"12090-3"}
                            />
                        </FormControl>
                        <br></br>
                        <Button marginBottom={'20px'} bg="agiliza.purple" w="100%" type="submit" onClick={handleUpdate}>
                            Atualizar Configurações
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};
