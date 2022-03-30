import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    CloseButton,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Select,
    Text,
    Textarea
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, Fragment, useState } from 'react';
import { useAccount } from '../../../hooks/useAccount';
import { usePayment } from '../../../hooks/usePayment';

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [address, setAdress] = useState('');
    const [addressNumber, setAdressNumber] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [value, setValue] = useState(0);
    const [valueType, setValueType] = useState('Percentual');

    const route = useRouter();
    const { createNewAccount, errorMessage, setErrorMessage } = useAccount();


    const companyTypeOptions = [{
        value: "MEI",
        display: "Micro Empreendedor Individual"
    },
    {
        key: "LIMITED",
        display: "Empresa Limitada"
    },
    {
        key: "INDIVIDUAL",
        display: "Empresa Individual"
    },
    {
        key: "ASSOCIATION",
        display: "Associação"
    }]

    function handleCreateAccount(event: FormEvent) {
        event.preventDefault();

        let splitConfiguration = {} as any;
        if(valueType === 'Fixo') {
            splitConfiguration.fixedValue = Number(value),
            splitConfiguration.percentValue = null
        }else{
            splitConfiguration.fixedValue = null,
            splitConfiguration.percentValue = Number(value)
        }
     
        const newValue = {
            asaasAccount: {
                name,
                email,
                cpfCnpj,
                companyType,
                mobilePhone,
                address,
                addressNumber: addressNumber ?? Number(addressNumber),
                province,
                postalCode
            },
            splitConfiguration
        };
        createNewAccount(newValue);
        
        route.push('/account');
    }

    return (
        <Fragment>
            {errorMessage && (
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    <AlertTitle mr={2}>Ação não disponível!</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                    <CloseButton onClick={() => setErrorMessage('')} position="absolute" right="10px" />
                </Alert>
            )}
            <Text
                fontSize="3xl"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                paddingLeft={'10px'}
                paddingBottom={'10px'}
            >
                Adicionar Conta
            </Text>
            <form style={{ width: '100%', maxWidth: 1200, paddingLeft: '2%', paddingRight: '4%' }}>
                <Grid
                    templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)',
                        xl: 'repeat(3, 1fr)'
                    }}
                    gap={6}
                >
                    <FormControl>
                        <FormLabel htmlFor="name">Nome da Conta</FormLabel>
                        <Input
                            placeholder="Empresa Contoso"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="mobilePhone">Celular</FormLabel>
                        <Input id="mobilePhone" onChange={(e) => setMobilePhone(e.target.value)} />
                    </FormControl>

                </Grid>
                <br />
                <Grid
                    templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)',
                        xl: 'repeat(2, 1fr)'
                    }}
                    gap={6}
                >
                    <FormControl>
                        <FormLabel htmlFor="cpfCnpj">Cpf ou Cnpj</FormLabel>
                        <Input id="cpfCnpj"  onChange={(e) => setCpfCnpj(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="companyType">Tipo da empresa</FormLabel>
                        <Select id="companyType" value={companyType} onChange={(e) => setCompanyType(e.target.value)}>
                            <option>Selecione o tipo da empresa</option>
                            {companyTypeOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.display}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)',
                        xl: 'repeat(4, 1fr)'
                    }}
                    gap={6}
                >
                    <FormControl>
                        <FormLabel htmlFor="adress">Endereço</FormLabel>
                        <Input id="adress" onChange={(e) => setAdress(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="adressNumber">Número</FormLabel>
                        <Input id="adressNumber" type="number" onChange={(e) => setAdressNumber(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="province">Estado</FormLabel>
                        <Input id="province" onChange={(e) => setProvince(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="postalCode">CEP</FormLabel>
                        <Input id="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
                    </FormControl>
                </Grid>
                <br />
                <Grid
                    templateColumns={{
                        sm: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)',
                        xl: 'repeat(2, 1fr)'
                    }}
                    gap={6}
                >
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
								onChange={(e) => setValue(Number(e.target.value))}
								placeholder={valueType == "Fixo" ?  "R$ 0,00" : "10%"}
							/>
						</FormControl>
                </Grid>
                <br />
            
                <Button marginBottom={'20px'} bg="brand.red" w="100%" type="submit" onClick={handleCreateAccount}>
                    Adicionar Conta
                </Button>
            </form>
        </Fragment>
    );
}
