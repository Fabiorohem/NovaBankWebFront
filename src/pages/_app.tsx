import { AppProps } from 'next/app';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import '../Styles/index.css';

import { ClientProvider } from '../context/ClientContext';

import { theme } from '../../theme';

import { Content } from '../components/Content';
import { LoadingProvider } from '../context/LoadingContext';
import { ExtractProvider } from '../context/ExtractContext';
import { ChargeProvider } from '../context/ChargeContext';
import { Fragment } from 'react';
import { PaymentProvider } from '../context/PaymentContext';
import { TransferProvider } from '../context/TransferContext';
import { AuthProvider } from '../context/AuthContext';
import { AccountProvider } from '../context/AccountContext';
import '../Styles/index.css'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<VStack height="100vh" width="full" spacing={0}>
					<LoadingProvider>
						<AccountProvider>
							<TransferProvider>
								<PaymentProvider>
									<ChargeProvider>
										<ExtractProvider>
											<ClientProvider>
												<Content PrincipalPanel={Component} pageProps={pageProps} />
											</ClientProvider>
										</ExtractProvider>
									</ChargeProvider>
								</PaymentProvider>
							</TransferProvider>
						</AccountProvider>
					</LoadingProvider>
				</VStack>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
