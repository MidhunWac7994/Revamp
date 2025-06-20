/* ------getType returns the data type----------*/
export const getType = (obj) => {
  const lowerCaseTheFirstLetter = (str) => str[0].toLowerCase() + str.slice(1);
  const type = typeof obj;
  if (type !== "object") {
    return type;
  }

  return lowerCaseTheFirstLetter(
    Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, "$1")
  );
};

/* -----usage-----------

getType([]); // "array"
getType('123'); // "string"
getType(null); // "null"
getType(undefined); // "undefined"
getType(); // "undefined"
getType(function () {}); // "function"
getType(/123/g); // "regExp"
getType(new Date()); // "date"
getType(new Map()); // "map"
getType(new Set()); // "set"

-----*/
