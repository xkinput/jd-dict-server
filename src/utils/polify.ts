// This is a workaround till BigInt is fully supported by the standard
// See https://tc39.es/ecma262/#sec-ecmascript-language-types-bigint-type
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// If this is not done, then a JSON.stringify(BigInt) throws
// "TypeError: Do not know how to serialize a BigInt"
/* global BigInt:writable */
/* eslint no-extend-native: ["error", { "exceptions": ["BigInt"] }] */
declare interface BigInt {
  toJSON: Function
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
