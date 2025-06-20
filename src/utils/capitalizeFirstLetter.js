export const capitalizeFirstLetter = (str) => {
  return str?.replace(/\b\w/g, (char) => char?.toUpperCase()) || "";
};
