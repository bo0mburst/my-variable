// Type Checking

const checkType = variable => {
  return Object.prototype.toString.call(variable).slice(8, -1);
};

const isUndefined = variable => {
  return checkType(variable) === "Undefined";
};

const isNull = variable => {
  return checkType(variable) === "Null";
};

const isEmpty = variable => {
  if (isNumber(variable) || isBoolean(variable)) {
    return false;
  }

  if (isUndefined(variable) || isNull(variable)) {
    return true;
  }

  if (isString(variable) || isArray(variable)) {
    return variable.length === 0;
  }

  if (isObject(variable)) {
    return !Object.keys(variable).length;
  }
};

const isString = variable => {
  return checkType(variable) === "String";
};

const isNumber = variable => {
  return checkType(variable) === "Number";
};

const isBoolean = variable => {
  return checkType(variable) === "Boolean";
};

const isDate = variable => {
  return checkType(variable) === "Date";
};

const isDateString = variable => {
  return isString(variable) && !NaN(Date.parse(variable));
};

const isObject = variable => {
  return checkType(variable) === "Object";
};

const isArray = variable => {
  return Array.isArray(variable);
};

const isFunction = variable => {
  return checkType(variable) === "Function";
};

const isURL = variable => {
  if (!isString(variable)) return false;

  let pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!pattern.test(variable);
};

const isEmail = variable => {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return !!pattern.test(variable);
};

const isFile = (variable, ext) => {
  if (checkType(variable) !== "File") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
};

const isImage = (variable, ext) => {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "image") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
};

const isVideo = (variable, ext) => {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "video") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
};

const isAudio = (variable, ext) => {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "audio") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
};

// Check Equality

const isEqual = (variable, other) => {
  if (checkType(variable) !== checkType(other)) {
    return false;
  }

  if (isObject(variable) && !isEqualObject(variable, other)) {
    return false;
  }

  if (isArray(variable)) {
    if (!isEqualArray(variable, other)) return false;
  }

  if (isDate(variable)) {
    if (!isEqualDate(variable, other)) return false;
  }

  if (
    !isObject(variable) &&
    !isArray(variable) &&
    !isDate(variable) &&
    variable !== other
  ) {
    return false;
  }

  return true;
};

const isEqualDate = (date, other) => {
  if (!isDate(date) || !isDate(other)) return false;
  return date.getTime() === other.getTime();
};

const isEqualObject = (obj, other) => {
  if (!isObject(obj) || !isObject(other)) return false;

  let objProp = Object.getOwnPropertyNames(obj);
  let otherProp = Object.getOwnPropertyNames(other);

  if (objProp.length !== otherProp.length) return false;

  return objProp.every(i => isEqual(obj[i], other[i]));
};

const isEqualArray = (array, other) => {
  if (!isArray(array) || !isArray(other)) return false;

  if (array.length !== other.length) return false;

  return array.every(i => other.every(j => isEqual(i, j)));
};

// Has
const hasExtension = (variable, ext) => {
  let extension = variable.name.split(".").pop();
  if (!(!!ext.indexOf && variable)) return false;

  return ext.indexOf(extension) > -1;
};

const isMatch = (obj, other) => {
  if (!isObject(obj) || !isObject(other)) return false;

  let otherParams = Object.getOwnPropertyNames(other);

  return otherParams.every(i => isEqual(obj[i], other[i]));
};

const hasMatch = (array, obj) => {
  if (!isArray(array)) return false;

  return array.every(i => isMatch(i, obj));
};

module.exports = {
  checkType,
  isUndefined,
  isNull,
  isEmpty,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isDateString,
  isObject,
  isArray,
  isFunction,
  isURL,
  isEmail,
  isFile,
  isImage,
  isVideo,
  isAudio,
  isEqualObject,
  isEqualArray,
  isEqualDate,
  isEqual,
  isMatch,
  hasMatch
};
