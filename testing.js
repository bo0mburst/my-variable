const myvariable = require("./index.js");

let x = { name: "a", age: 30 };

let y = { age: 30, name: "a" };

// console.log(myvariable.hasMatch(x, y));

console.log(myvariable.isEqualObject(x, y));
