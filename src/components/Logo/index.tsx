import { Box, Heading} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

export const Logo = () => {
	return (
		<Box p={{ sm: 0, md: 2, xl: 6 }} pb={{ sm: 2, md: 2, xl: 6 }}>
			<Heading fontSize={{ sm: '1.9em', xl: '1.9em' }}>
				<Image
					 src="https://agiliza.app.br/assets/img/logo.png" 
					 width={150}
					 alt=""
						 />
			</Heading>
		</Box>
	);
};
