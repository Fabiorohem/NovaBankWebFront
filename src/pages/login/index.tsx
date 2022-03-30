import { useState } from 'react';
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Link,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
	const { signIn } = useAuth();
	const { register, handleSubmit } = useForm();
	const [ showPassword, setShowPassword ] = useState(false);

	const handleShowClick = () => setShowPassword(!showPassword);

	async function handleSignIn(data) {
			await signIn(data);
	}

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="100vh"
			backgroundColor="gray.800"
			justifyContent="center"
			alignItems="center"
		>
			<Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
				<Heading color="agiliza.purple"><img src="https://agiliza.app.br/assets/img/logo.png" width="250"></img></Heading>
				<Box minW={{ base: '90%', md: '468px' }}>
					<form onSubmit={handleSubmit(handleSignIn)}>
						<Stack spacing={4} p="1rem" backgroundColor="gray.900" boxShadow="md">
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										// eslint-disable-next-line react/no-children-prop
										children={<CFaUserAlt color={'whiteAlpha.400'} />}
									/>
									<Input
										type="text"
										name="username"
										id="username"
										color={'white'}
										placeholder="usename"
										{...register('username')}
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										// eslint-disable-next-line react/no-children-prop
										children={<CFaLock color={'whiteAlpha.400'} />}
									/>
									<Input
										type={showPassword ? 'text' : 'password'}
										name="password"
										id="password"
										color={'white'}
										placeholder="senha"
										{...register('password')}
									/>
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={handleShowClick}>
											{showPassword ? 'Esconder' : 'Mostrar'}
										</Button>
									</InputRightElement>
								</InputGroup>
								<FormHelperText textAlign="right">
									<Link>Esqueceu sua senha?</Link>
								</FormHelperText>
							</FormControl>
							<Button borderRadius={0} type="submit" variant="solid" bg="agiliza.purple" width="full">
								Login
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
