import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';
import { Loading } from '../Loading';
import { Sidebar } from '../Sidebar';

export const Content = ({ PrincipalPanel, pageProps }) => {
	const { loading } = useLoading();
	const { verifiAuth } = useAuth();

	verifiAuth();

	return (
		<HStack width={'full'} height={'full'} overflow="hidden">
			{!loading ? (
				<Fragment>
					<Sidebar />
					<VStack pt={12} width="full" height="full" spacing={6} overflow={'auto'}>
						<PrincipalPanel {...pageProps} />
					</VStack>
					{/* <Loading /> */}
				</Fragment>
			) : (
				<Loading />
			)}
		</HStack>
	);
};
