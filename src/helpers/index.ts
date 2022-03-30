export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const parseToBrDate = (date: string) => {
  const stringToDate = new Date(date);
  return new Intl.DateTimeFormat("pt-br").format(stringToDate);
};

export const parseToGMTDate = (date: string) => {
  const stringToDate = new Date(date);
  return new Intl.DateTimeFormat("en-gb", {
    dateStyle: "short",
    timeStyle: "full",
  }).format(stringToDate);
};
