export const makeTwoDigitNumber = (number) => {
  return number?.toString().length === 1 ? `00.0${number}` : `00.${number}`;
};
