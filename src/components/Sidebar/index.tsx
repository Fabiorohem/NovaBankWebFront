import { Button, List, ListItem, VStack, useColorMode, IconButton, Box, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Logo } from '../Logo';

import { navItems } from './nav-data';
import { NavItem } from './nav-item';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { api } from '../../services/api';
import { useAccount } from '../../hooks/useAccount';



export const Sidebar = () => {
	const { toggleColorMode, colorMode } = useColorMode();
	const { logout } = useAuth();
	const [marginLeft, setMarginLeft] = useState('-29vh');
	const [user, setUser] = useState(undefined);
	const { accounts } = useAccount();
	
	const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
	
	function handleMarginLeft() {
		if (marginLeft === `0.8vh`) {
			setMarginLeft(`-29vh`);
		} else {
			setMarginLeft(`0.8vh`);
		}
	}


	useEffect(() => {
			api.get('profile').then(({ data }) => setUser(data))
	},[accounts])



	return (
		<VStack
			display={'flex'}
			width="full"
			height="full"
			marginLeft={isMobile ? marginLeft : '0.8vh'}
			maxW={{ base: 72 }}
			borderRightColor="gray.600"
			borderRightWidth={2}
		>
			{
				isMobile && <Button marginLeft={344} marginTop={1} onClick={handleMarginLeft}>
					{marginLeft === '0.8vh' ? <AiOutlineClose /> : <GiHamburgerMenu />}
				</Button>
			}
			<Logo />
			<Box
				display={'flex'}
				width={'full'}
				alignItems={'center'}
				justifyContent={'center'}
				borderBottomWidth={2}
				borderBottomColor={'gray.600'}
				maxWidth={'90%'}
			>

				<VStack
					display={'flex'}
					width="full"
					alignItems={"left"}
				>

					{user && (
						<>
							<Box>
								<Text>Olá: <strong> {user.userName} </strong></Text>
							</Box>
							<Box>
								<Text>Banco: <strong>461 - Asaas I.P S.A</strong></Text>
								<Text>Agência: <strong>{user.agencia}</strong> </Text>
								<Text>Conta: <strong>{user.conta}</strong></Text>
							</Box>
						</>
					)}

					<Box width={'100%'}>
						<IconButton
							aria-label="toggle theme"
							alignItems="center"
							onClick={toggleColorMode}
							icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
							marginRight={2}
							marginBottom={2}
						/>
						<Button width={'70%'} marginLeft={2} marginBottom={2} onClick={logout}>
							Logout
						</Button>
					</Box>

				</VStack>


			</Box>
			<List width="full" overflowY="auto">
				{navItems.map((item, index) => (
					<ListItem key={item.label}>
						<NavItem item={item} onClick={() => setMarginLeft('-29vh')} />
					</ListItem>
				))}

			</List>

		</VStack>
	);
};
