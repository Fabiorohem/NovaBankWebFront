import { StaticImageData } from "next/image";
import PixIcon from "@/assets/icons/billIcon.png";
import BoletoIcon from "@/assets/icons/billIcon.png";
import DebitIcon from "@/assets/icons/billIcon.png";
import CreditCardIcon from "@/assets/icons/billIcon.png";
import VisaIcon from "@/assets/icons/billIcon.png";
import MasterCardIcon from "@/assets/icons/billIcon.png";

export interface TableProps {
  title: string;
  linkText: string;
  viewAllHref: string;
  columns: string[];
  data: { [key: string]: any }[];
}

export const statusClasses: { [key: string]: string } = {
  Concluído: "text-green-500",
  Pendente: "text-yellow-500",
  Reprovado: "text-red-500",
  Cancelado: "text-red-500",
};

export const paymentIcons: { [key: string]: StaticImageData } = {
  Pix: PixIcon,
  Boleto: BoletoIcon,
  Débito: DebitIcon,
  Crédito: CreditCardIcon,
};

export const cardBrands: { [key: string]: StaticImageData } = {
  Visa: VisaIcon,
  MasterCard: MasterCardIcon,
};

export interface TablePropsWithFilters extends TableProps {
  filters: {
    searchTerm?: string;
    status?: string;
    type?: string;
    dateRange?: { start?: string; end?: string };
  };
}
