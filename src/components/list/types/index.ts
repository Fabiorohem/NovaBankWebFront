import { StaticImageData } from "next/image";

export type ListItem = {
  iconSrc: StaticImageData | string;
  label: string;
  alt: string;
  route: string;
};

export type Section = {
  title: string;
  iconSrc: StaticImageData | string;
  alt: string;
  items: ListItem[];
};

export type ListItemsProps = {
  section: Section;
};
