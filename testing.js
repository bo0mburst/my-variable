const check = require("./index.js");

let x = { age: 12, name: "a", j: function() {} };

let y = { age: 30 };

// console.log(check.isEqualArray(x, y))

// console.log(check.isEqual(
//     2,"2"
// ))
console.log(check.isMatch(x, y));
