import { IconType } from 'react-icons/lib';

type HeaderItem = {
	type: 'header';
};

type LinkItem = {
	type: 'link';
	icon: IconType;
	href: string;
	admin?:boolean
};

type ItemTypeProps = HeaderItem | LinkItem;

export type NavItem = ItemTypeProps & {
	label: string;
	admin?:boolean;
};
