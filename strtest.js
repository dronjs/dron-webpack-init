var stringifyObject = require('stringify-object');
var test = {
  hello: new Function("return 1;")
}
console.log(stringifyObject(test));
