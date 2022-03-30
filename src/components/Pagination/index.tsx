import { Fragment } from 'react';
import { Icon, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useClient } from '../../hooks/useClients';
import { useCharge } from '../../hooks/useCharge';
import { useExtract } from '../../hooks/useExtract';
import { usePayment } from '../../hooks/usePayment';
import { useTransfer } from '../../hooks/useTransfer';

export default function Pagination() {
	const route = useRouter();
	const location = route.pathname;
	const pathName = location.replace('/', '');
	const iconColor = useColorModeValue('black', 'white');

	let offset: number;
	let totalCount: number;
	let hasMore: boolean;

	const { setTransferOffset, transferResponse } = useTransfer();
	const transferOffset = transferResponse.offsetState;
	const transferTotalCount = transferResponse.totalCount;
	const transferHasMore = transferResponse.hasMore;

	const { setExtractOffset, extractResponse } = useExtract();
	const extractOffset = extractResponse.offsetState;
	const extractTotalCount = extractResponse.totalCount;
	const extractHasMore = extractResponse.hasMore;

	const { setChargeOffset, chargeResponse } = useCharge();
	const chargeTotalCount = chargeResponse.totalCount;
	const chargeHasMore = chargeResponse.hasMore;
	const chargeOffset = chargeResponse.offsetState;

	const { setClientOffset, clientReponse } = useClient();
	const clientTotalCount = clientReponse.totalCount;
	const clientHasMore = clientReponse.hasMore;
	const clientOffset = clientReponse.offsetState;

	const { setPaymentOffset, paymentResponse } = usePayment();
	const paymentOffset = paymentResponse.offsetState;
	const paymentTotalCount = paymentResponse.totalCount;
	const paymentHasMore = paymentResponse.hasMore;

	const itensPerPage = 10;

	switch (pathName) {
		case 'clients':
			offset = clientOffset;
			totalCount = clientTotalCount;
			hasMore = clientHasMore;
			break;
		case 'charges':
			offset = chargeOffset;
			totalCount = chargeTotalCount;
			hasMore = chargeHasMore;
			break;
		case 'extract':
			offset = extractOffset;
			totalCount = extractTotalCount;
			hasMore = extractHasMore;
			break;
		case 'payments':
			offset = paymentOffset;
			totalCount = paymentTotalCount;
			hasMore = paymentHasMore;
			break;
		case 'transfers':
			offset = transferOffset;
			totalCount = transferTotalCount;
			hasMore = transferHasMore;
			break;
		default:
			break;
	}

	function handleSetNextOffset(path, offset, itensPerPage) {
		switch (path) {
			case 'clients':
				setClientOffset(offset + itensPerPage);
				break;
			case 'charges':
				setChargeOffset(offset + itensPerPage);
				break;
			case 'extract':
				setExtractOffset(offset + itensPerPage);
				break;
			case 'payments':
				setPaymentOffset(offset + itensPerPage);
				break;
			case 'transfers':
				setTransferOffset(offset + itensPerPage);
				break;
			default:
				break;
		}
	}

	function handleSetPreviousOffset(path, offset, itensPerPage) {
		switch (path) {
			case 'clients':
				setClientOffset(offset - itensPerPage);
				break;
			case 'charges':
				setChargeOffset(offset - itensPerPage);
				break;
			case 'extract':
				setExtractOffset(offset - itensPerPage);
				break;
			case 'payments':
				setPaymentOffset(offset - itensPerPage);
				break;
			case 'transfer':
				setTransferOffset(offset - itensPerPage);
				break;
			default:
				break;
		}
	}

	return (
		<Stack display={'flex'} direction={'row'} width={'100%'} justifyContent={'flex-end'}>
			{offset && (
				<Fragment>
					<Icon
						width={5}
						height={5}
						mr={4}
						ml={8}
						as={MdSkipPrevious}
						onClick={() => handleSetPreviousOffset(pathName, offset, itensPerPage)}
						cursor={'pointer'}
					/>
				</Fragment>
			)}

			<Text mr={totalCount <= 10 ? 15 : 0}>
				{offset}
				{totalCount ? ` - ${totalCount}` : ''}
			</Text>

			{hasMore && (
				<Icon
					width={5}
					height={5}
					mr={4}
					ml={8}
					as={MdSkipNext}
					color={iconColor}
					onClick={() => handleSetNextOffset(pathName, offset, itensPerPage)}
					cursor={'pointer'}
				/>
			)}
		</Stack>
	);
}
