import { Box, Heading } from '@chakra-ui/layout';

export const Logo = () => {
	return (
		<Box p={{ sm: 0, md: 2, xl: 6 }} pb={{ sm: 2, md: 2, xl: 6 }}>
			<Heading fontSize={{ sm: '1.9em', xl: '1.9em' }}>novabank</Heading>
		</Box>
	);
};
