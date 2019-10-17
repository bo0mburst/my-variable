// Type Checking

function checkType(variable) {
  return Object.prototype.toString.call(variable).slice(8, -1);
}

function isUndefined(variable) {
  return checkType(variable) === "Undefined";
}

function isNull(variable) {
  return checkType(variable) === "Null";
}

function isEmpty(variable) {
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
}

function isString(variable) {
  return checkType(variable) === "String";
}

function isNumber(variable) {
  return checkType(variable) === "Number";
}

function isBoolean(variable) {
  return checkType(variable) === "Boolean";
}

function isDate(variable) {
  return checkType(variable) === "Date";
}

function isDateString(variable) {
  return isString(variable) && !NaN(Date.parse(variable));
}

function isObject(variable) {
  return checkType(variable) === "Object";
}

function isArray(variable) {
  return Array.isArray(variable);
}

function isFunction(variable) {
  return checkType(variable) === "Function";
}

function isURL(variable) {
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
}

function isEmail(variable) {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return !!pattern.test(variable);
}

function isFile(variable, ext) {
  if (checkType(variable) !== "File") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
}

function isImage(variable, ext) {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "image") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
}

function isVideo(variable, ext) {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "video") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
}

function isAudio(variable, ext) {
  if (!isFile(variable)) return false;

  if (variable["type"].split("/")[0] !== "audio") return false;

  if (ext && !hasExtension(variable, ext)) return false;

  return true;
}

// Check Equality

function isEqual(variable, other) {
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
}

function isEqualDate(date, other) {
  if (!isDate(date) || !isDate(other)) return false;
  return date.getTime() === other.getTime();
}

function isEqualObject(obj, other) {
  if (!isObject(obj) || !isObject(other)) return false;

  let objProp = Object.getOwnPropertyNames(obj);
  let otherProp = Object.getOwnPropertyNames(other);

  if (objProp.length !== otherProp.length) return false;

  for (let i = 0; i < objProp.length; i++) {
    let prop = objProp[i];

    if (!isEqual(obj[prop], other[prop])) {
      return false;
    }
  }

  return true;
}

function isEqualArray(array, other) {
  if (!isArray(array) || !isArray(other)) return false;

  if (array.length !== other.length) return false;

  for (let i = 0; i < array.length; i++) {
    if (!isEqual(array[i], other[i])) {
      return false;
    }
  }

  return true;
}

// Has
function hasExtension(variable, ext) {
  let extension = variable.name.split(".").pop();
  if (!(!!ext.indexOf && variable)) return false;

  return ext.indexOf(extension) > -1;
}

function isMatch(obj, other) {
  if (!isObject(obj) || !isObject(other)) return false;

  let otherParams = Object.getOwnPropertyNames(other);

  for (let i = 0; i < otherParams.length; i++) {
    let prop = otherParams[i];
    if (!isEqual(obj[prop], other[prop])) return false;
  }

  return true;
}

function hasMatch(array, obj) {
  if (!isArray(array)) return false;

  for (let i = 0; i < array.length; i++) {
    if (isMatch(array[i], obj)) {
      return true;
    }
  }

  return false;
}

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
