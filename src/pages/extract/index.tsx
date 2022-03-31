import { Box, Flex, Icon, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useExtract } from '../../hooks/useExtract';
import { formatCurrency, parseToBrDate } from '../../helpers';
import Pagination from '../../components/Pagination';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { api } from '../../services/api';

export default function Extract() {
	const { extract } = useExtract();
	const [ balance, setBalance ] = useState({});
	useEffect(() => {
		api.get('/transferencias/balance').then((response) => setBalance(response.data.totalBalance));
	}, []);



	return (
		<Fragment>
			<Box width={{ base: '100%' }} >
				<Box w="100%">
					<Text fontSize="3xl" textAlign={'center'}>
						Extrato
					</Text>
				</Box>
				<Box w="100%">
					<Flex>
						<Box p="4" />
						<Spacer />
						<Box p="4">
							<Text fontSize="2xl" color={balance <= 0 ? 'agiliza.purple' : 'green.light'}>
								Balanço {formatCurrency(balance)}
							</Text>
						</Box>
					</Flex>
				</Box>
				<Table size={'sm'}>
					<Thead>
						<Tr>
							<Th>data</Th>
							<Th>descrição</Th>
							<Th>valor</Th>
						</Tr>
					</Thead>
					<Tbody>
						{extract.map((extract) => (
							<Tr key={extract.id}>
								<Td>{parseToBrDate(extract.date)}</Td>
								<Td>{extract.description}</Td>
								<Td>{formatCurrency(extract.value)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
				<Pagination />
			</Box>
		</Fragment>
	);
}
