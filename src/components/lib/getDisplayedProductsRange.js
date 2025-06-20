import { PAGE_SIZE } from "../../components/Constants";

export const getDisplayedProductsRange = (pageIndex = 1, productLength = 0) => {
  const startIndex = (pageIndex - 1) * PAGE_SIZE + 1;
  let endIndex = startIndex + PAGE_SIZE - 1;

  if (startIndex > productLength) {
    endIndex = productLength + startIndex - 1;
  } else {
    endIndex = Math.min(startIndex + PAGE_SIZE - 1, productLength);
  }

  return `${startIndex} – ${endIndex}`;
};
