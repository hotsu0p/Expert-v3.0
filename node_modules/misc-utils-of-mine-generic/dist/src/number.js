"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrime = exports.randomItem = exports.clamp = exports.intBetween = exports.between = exports.float = exports.floats = exports.randomFloatsBetween = exports.randomFloatBetween = exports.int = exports.ints = exports.randomIntsBetween = exports.randomIntBetween = exports.counter = exports.unique = void 0;
var array_1 = require("./array");
var _unique = 0;
function unique(prefix) {
    if (prefix === void 0) { prefix = '_'; }
    return prefix + _unique++;
}
exports.unique = unique;
var _counter = 0;
function counter() {
    return _counter++;
}
exports.counter = counter;
function randomIntBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}
exports.randomIntBetween = randomIntBetween;
function randomIntsBetween(l, min, max) {
    return array_1.array(l).map(function (n) { return randomIntBetween(min, max); });
}
exports.randomIntsBetween = randomIntsBetween;
exports.ints = randomIntsBetween;
exports.int = randomIntBetween;
function randomFloatBetween(a, b) {
    return Math.random() * b + a;
}
exports.randomFloatBetween = randomFloatBetween;
function randomFloatsBetween(l, min, max) {
    return array_1.array(l).map(function (n) { return randomFloatBetween(min, max); });
}
exports.randomFloatsBetween = randomFloatsBetween;
exports.floats = randomFloatsBetween;
exports.float = randomFloatBetween;
/**
 * Makes sure n is between min and max inclusive.
 */
function between(n, min, max) {
    return Math.max(min, Math.min(n, max));
}
exports.between = between;
/**
 * Makes sure n is between min and max inclusive and is natural.
 */
function intBetween(n, min, max) {
    return Math.trunc(Math.max(min, Math.min(n, max)));
}
exports.intBetween = intBetween;
exports.clamp = intBetween;
function randomItem(a) {
    return a[randomIntBetween(0, a.length - 1)];
}
exports.randomItem = randomItem;
function isPrime(num) {
    for (var i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0)
            return false;
    return num !== 1;
}
exports.isPrime = isPrime;
//# sourceMappingURL=number.js.map