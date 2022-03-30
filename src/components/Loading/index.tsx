import { Box, Center, CircularProgress, Container, Text } from '@chakra-ui/react';

export const Loading = () => {
	return (
		<Box width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
			<CircularProgress isIndeterminate color="brand.red" />
		</Box>
	);
};
