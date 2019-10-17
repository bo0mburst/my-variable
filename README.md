# my-variable

This is a collection of functions that checks variable type and more.

## Usage

```javascript
const myvariable = require("./index.js");

let x = 5;

if (myvariable.isNumber(x)) {
  // do something
}
```

## functions

- .checkType(variable) : Checks the type of your variable

- .isUndefined(variable) : Checks if variable is undefined
- isNull(variable) : Checks if variable is Null
- .isEmpty(variable) : Checks if variable is Empty
- .isString(variable) : Checks if variable is a String
- .isNumber(variable) : Checks if variable is a Number
- .isBoolean(variable) : Checks if variable is a Boolean
- .isDate(variable) : Checks if variable is classified as a Date object
- .isDateString(variable) : Checks if variable is a valid Date String
- .isObject(variable) : Checks if variable is classified as an Object object
- .isArray(variable) : Checks if variable is classified as an Array object
- .isFunction(variable) : Checks if variable is classified as a Function object
- .isURL(variable) : Checks if variable is a valid URL String
- .isEmail(variable) : Checks if variable is a valid Email String
- .isFile(variable) : Checks if variable is classified as a File object
- .isImage(variable) : Checks if variable is a File type Image
- .isVideo(variable) : Checks if variable is a File type Video
- .isAudio(variable) : Checks if variable is a File type Audio
- .isEqualObject(obj, other) : Checks if 2 objects (object object) has equal properties and property values
- .isEqualArray(array, other) : Checks if 2 arrays (object array) has equal properties and property values
- .isEqualDate(date, other) : Checks if 2 Dates (object Date) are equal
- .isEqual(variable, other) : Checks if 2 variables are equal
- .isMatch(obj, other) : Checks if obj has equivalent properties of other (object)
- .hasMatch(array, other) : Checks if atleast one of the array of objects has an equivalent properties of other (object)
