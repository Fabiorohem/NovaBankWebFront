import { Button, List, ListItem, VStack, useColorMode, IconButton, Box, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Logo } from '../Logo';

import { navItems } from './nav-data';
import { NavItem } from './nav-item';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
export const Sidebar = () => {
	const { toggleColorMode, colorMode } = useColorMode();
	const { logout, isAdmin } = useAuth();
	const [ marginLeft, setMarginLeft ] = useState(-288);

	function handleMarginLeft() {
		if (marginLeft === 0) {
			setMarginLeft(-288);
		} else {
			setMarginLeft(0);
		}
	}

	return (
		<VStack
			display={'flex'}
			width="full"
			height="full"
			marginLeft={marginLeft}
			maxW={{ base: 72 }}
			borderRightColor="gray.600"
			borderRightWidth={2}
		>
			<Button marginLeft={344} marginTop={1} onClick={handleMarginLeft}>
				{marginLeft === 0 ? <AiOutlineClose /> : <GiHamburgerMenu />}
			</Button>
			<Logo />
			<Box
				display={'flex'}
				width={'full'}
				alignItems={'center'}
				justifyContent={'center'}
				borderBottomWidth={2}
				borderBottomColor={'gray.600'}
			>
				<IconButton
					aria-label="toggle theme"
					alignItems="center"
					onClick={toggleColorMode}
					icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
					marginRight={2}
					marginBottom={2}
				/>
				<Button marginLeft={2} marginBottom={2} onClick={logout}>
					Logout
				</Button>
			</Box>
			<List width="full" overflowY="auto">
				{navItems.map((item, index) => (
					<ListItem key={item.label}>
						<NavItem item={item} onClick={() => setMarginLeft(-288)} />
					</ListItem>
				))}
			</List>
		</VStack>
	);
};
