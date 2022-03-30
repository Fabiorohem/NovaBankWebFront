import NextLink from 'next/link';
import { Heading, Icon, Text, HStack, Box, Link, useColorModeValue } from '@chakra-ui/react';

import { NavItem as Item } from '../../types/nav-item';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

type Props = {
	item: Item;
	onClick: () => void;
};

export const NavItem = ({ item, onClick }: Props) => {
	const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
	const secondaryTitleColor = useColorModeValue('gray.900', 'white');
	const secondaryBgColor = useColorModeValue('gray.100', 'gray.600');
	const { label } = item;
	const location = useRouter();
	const {isAdmin} = useAuth();
	
	if(item.admin && !isAdmin) return<></>;

	if (item.type === 'link') {
		const { icon } = item;
		const isActive = location.pathname === item.href;

		return (
			<NextLink href={item.href}>
				<Link variant="unstyled" _hover={{ textDecoration: 'none' }} onClick={onClick}>
					<HStack
						align="center"
						justify="flex-start"
						height={{ base: 12, '2xl': 12 }}
						transition="ease-out"
						transitionProperty="background"
						transitionDuration="normal"
						_hover={{
							background: secondaryBgColor
						}}
					>
						<Icon
							width={5}
							height={5}
							mr={{ sm: 3, md: 3, lg: 4, xl: 4 }}
							ml={{ sm: 3, md: 3, lg: 4, xl: 4 }}
							color={isActive ? 'brand.red' : secondaryTextColor}
							as={icon}
						/>
						<Text
							fontSize={{ sm: '0.9em' }}
							fontWeight="medium"
							flex={1}
							letterSpacing="wider"
							color={isActive ? 'brand.red' : secondaryTextColor}
						>
							{label}
						</Text>
						{isActive && <Box width={1} height={6} bg="brand.red" />}
					</HStack>
				</Link>
			</NextLink>
		);
	}

	return (
		<Heading
			color={secondaryTitleColor}
			fontWeight="normal"
			textTransform="uppercase"
			letterSpacing={{ sm: 4, md: 4, xl: 4 }}
			fontSize={{ sm: '0.8em', md: '0.8em' }}
			ml={{ sm: 3, md: 3, lg: 4, xl: 4 }}
			mt={{ sm: 3, md: 3, lg: 4, xl: 4 }}
			mb={{ sm: 3, md: 3, lg: 4, xl: 4 }}
		>
			{label}
		</Heading>
	);
};
