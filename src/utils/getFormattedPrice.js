import { CURRENCY_CODE } from '../components/Constants';

export const getFormattedPrice = (locale, price) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: CURRENCY_CODE,
  });

  const formattedPrice =
    formatter && price
      ? formatter?.formatToParts(price)?.map((part, index) => {
          return { index: index, value: part?.value, type: part?.type };
        })
      : [];

  return formattedPrice;
};
