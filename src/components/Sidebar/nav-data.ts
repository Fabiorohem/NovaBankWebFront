import { FaHome, FaCompass, FaMusic, FaUserAlt, FaHeart, FaDatabase } from 'react-icons/fa';
import { RiSearchLine } from 'react-icons/ri';
import { GiBackwardTime } from 'react-icons/gi';
import { IoIosSettings } from 'react-icons/io';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { BiTransfer } from 'react-icons/bi';
import {} from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { CgNotes } from 'react-icons/cg';
import { NavItem } from '../../types/nav-item';

export const navItems: NavItem[] = [
	
	{
		type: 'header',
		label: 'Contas',
		admin: true
	},
	{
		type: 'link',
		href: '/account',
		icon: FaUserAlt,
		label: 'Listar Contas',
		admin: true
	},
	{
		type: 'link',
		href: '/account/create',
		icon: FaUserAlt,
		label: 'Criar Conta',
		admin: true
	},
	{
		type: 'header',
		label: 'Perfil',
	},
	{
		type: 'link',
		href: '/profile',
		icon: FaUserAlt,
		label: 'Editar Perfil',
	},
	{
		type: 'header',
		label: 'Clientes'
	},
	{
		type: 'link',
		href: '/clients',
		icon: RiSearchLine,
		label: 'Buscar cliente'
	},
	{
		type: 'link',
		href: '/clients/create',
		icon: FaCompass,
		label: 'Adicionar cliente'
	},
	{
		type: 'header',
		label: 'Cobranças'
	},
	{
		type: 'link',
		href: '/charges',
		icon: RiSearchLine,
		label: 'Buscar cobrança'
	},

	{
		type: 'link',
		href: '/charges/create',
		icon: FaCompass,
		label: 'Adicionar cobrança'
	},
	{
		type: 'header',
		label: 'Extrato'
	},
	{
		type: 'link',
		href: '/extract',
		icon: CgNotes,
		label: 'Listar extrato'
	},
	{
		type: 'header',
		label: 'Pagamentos'
	},
	{
		type: 'link',
		href: '/payments',
		icon: CgNotes,
		label: 'Listar pagamentos'
	},
	{
		type: 'link',
		href: '/payments/create',
		icon: MdOutlinePayment,
		label: 'Criar pagamento'
	},
	{
		type: 'link',
		href: '/payments/simulate',
		icon: MdOutlinePayment,
		label: 'Simular pagamento'
	},
	{
		type: 'header',
		label: 'transferências'
	},
	{
		type: 'link',
		href: '/transfers',
		icon: BiTransfer,
		label: 'Listar transfêrencias'
	},
	{
		type: 'link',
		href: '/transfers/transfer',
		icon: BiTransfer,
		label: 'Transferir'
	}
];
