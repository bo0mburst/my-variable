// Type Checking

function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

function isUndefined(value) {
  return checkType(value) === "Undefined";
}

function isNull(value) {
  return checkType(value) === "Null";
}

function isEmpty(value) {
  if (isNumber(value) || isBoolean(value)) {
    return false;
  }

  if (isUndefined(value) || isNull(value)) {
    return true;
  }

  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return !Object.keys(value).length;
  }
}

function isString(value) {
  return checkType(value) === "String";
}

function isNumber(value) {
  return checkType(value) === "Number";
}

function isBoolean(value) {
  return checkType(value) === "Boolean";
}

function isDate(value) {
  return checkType(value) === "Date";
}

function isDateString(value) {
  return isString(value) && !NaN(Date.parse(value));
}

function isObject(value) {
  return checkType(value) === "Object";
}

function isArray(value) {
  return Array.isArray(value);
}

function isFunction(value) {
  return checkType(value) === "Function";
}

function isURL(value) {
  if (!isString(value)) return false;

  let pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!pattern.test(value);
}

function isEmail(value) {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return !!pattern.test(value);
}

function isFile(value, ext) {
  if (checkType(value) !== "File") return false;

  if (ext && !hasExtension(value, ext)) return false;

  return true;
}

function isImage(value, ext) {
  if (!isFile(value)) return false;

  if (value["type"].split("/")[0] !== "image") return false;

  if (ext && !hasExtension(value, ext)) return false;

  return true;
}

function isVideo(value, ext) {
  if (!isFile(value)) return false;

  if (value["type"].split("/")[0] !== "video") return false;

  if (ext && !hasExtension(value, ext)) return false;

  return true;
}

function isAudio(value, ext) {
  if (!isFile(value)) return false;

  if (value["type"].split("/")[0] !== "audio") return false;

  if (ext && !hasExtension(value, ext)) return false;

  return true;
}

// Check Equality

function isEqual(value, other) {
  if (checkType(value) !== checkType(other)) {
    return false;
  }

  if (isObject(value) && !isEqualObject(value, other)) {
    return false;
  }

  if (isArray(value)) {
    if (!isEqualArray(value, other)) return false;
  }

  if (isDate(value)) {
    if (!isEqualDate(value, other)) return false;
  }

  if (
    !isObject(value) &&
    !isArray(value) &&
    !isDate(value) &&
    value !== other
  ) {
    return false;
  }

  return true;
}

function isEqualDate(value, other) {
  if (!isDate(value) || !isDate(other)) return false;
  return value.getTime() === other.getTime();
}

function isEqualObject(value, other) {
  if (!isObject(value) || !isObject(other)) return false;

  let valueProp = Object.getOwnPropertyNames(value);
  let otherProp = Object.getOwnPropertyNames(other);

  if (valueProp.length !== otherProp.length) return false;

  for (let i = 0; i < valueProp.length; i++) {
    let prop = valueProp[i];

    if (!isEqual(value[prop], other[prop])) {
      return false;
    }
  }

  return true;
}

function isEqualArray(value, other) {
  if (!isArray(value) || !isArray(other)) return false;

  if (value.length !== other.length) return false;

  for (let i = 0; i < value.length; i++) {
    if (!isEqual(value[i], other[i])) {
      return false;
    }
  }

  return true;
}

// Has
function hasExtension(value, ext) {
  let extension = value.name.split(".").pop();
  if (!(!!ext.indexOf && value)) return false;

  return ext.indexOf(extension) > -1;
}

function isMatch(value, other) {
  if (!isObject(value) || !isObject(other)) return false;

  let otherParams = Object.getOwnPropertyNames(other);

  for (let i = 0; i < otherParams.length; i++) {
    let prop = otherParams[i];

    if (!isEqual(value[prop], otherParams[prop])) return false;
  }
}

function hasMatch(value, other) {
  if (!isArray(value)) return false;

  for (let i = 0; i < value.length; i++) {
    value[i];
  }
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
  isEqual
};
