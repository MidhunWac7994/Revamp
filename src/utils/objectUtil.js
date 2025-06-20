import { getType } from './getType'

/* Remove a property in an object immutably  */
export const deleteKeyFromObject = (object, keyTobeDeleted) => {
  const { [keyTobeDeleted]: value, ...rest } = object;
  return rest;
};

/* check if object is empty, shall return true if empty*/
export const isObjectEmpty = (object) => {
  if (object) {
    if (getType(object) === "object") {
      if (object === null) {
        return true;
      } else {
        return Object.keys(object).length === 0;
      }
    } else return true;
  }

  return true;
};
