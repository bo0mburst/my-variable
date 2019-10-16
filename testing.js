const check = require("./index.js.js");

let x = [1, 2, 3, { age: 30, name: "a", j: function() {} }];

let y = [1, 2, 3, { name: "billy", age: 30, j: function() {} }];

// console.log(check.isEqualArray(x, y))

// console.log(check.isEqual(
//     2,"2"
// ))
console.log(check.isMath(
    x, {}
));
