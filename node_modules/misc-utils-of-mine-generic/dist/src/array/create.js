"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fill = exports.arrayRangePartition = exports.shuffle = exports.randomItems = exports.seq = exports.asArray = exports.array = void 0;
function array(n, sample) {
    var a = [];
    for (var i = 0; i < n; i++) {
        a.push(typeof sample === 'undefined' ? i : sample);
    }
    return a;
}
exports.array = array;
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
exports.asArray = asArray;
function seq(start, step, max) {
    if (start === void 0) { start = 0; }
    if (step === void 0) { step = 1; }
    if (max === void 0) { max = 0; }
    var result = [];
    for (var i = start; i < max; i += step) {
        result.push(i);
    }
    return result;
}
exports.seq = seq;
function randomItems(a, amount) {
    if (amount <= 0) {
        return [];
    }
    amount = Math.min(a.length, amount);
    var indexes = shuffle(array(a.length));
    var result = [];
    for (var i = 0; i < amount; i++) {
        result.push(a[indexes[i]]);
    }
    return result;
    // return randomIntsBetween(amount, 0, a.length - 1).map(i => a[i]).filter(notUndefined)
}
exports.randomItems = randomItems;
function shuffle(a) {
    return a.sort(function () { return Math.random() - 0.5; });
}
exports.shuffle = shuffle;
function arrayRangePartition(input, length, fillRestWith) {
    var digits = [];
    var acc = [];
    input.map(function (n, i) {
        acc.push(n);
        if (acc.length === length) {
            digits.push(acc);
            acc = [];
        }
    });
    if (acc.length) {
        if (typeof fillRestWith !== 'undefined' && acc.length < length) {
            acc = __spreadArrays(acc, array(length - acc.length).map(function (i) { return fillRestWith; }));
        }
        digits.push(acc);
    }
    return digits;
}
exports.arrayRangePartition = arrayRangePartition;
function fill(a, length, fillWith, before) {
    if (before === void 0) { before = false; }
    if (a.length < length) {
        a = before ? __spreadArrays(array(length - a.length).map(function (i) { return fillWith; }), a) : __spreadArrays(a, array(length - a.length).map(function (i) { return fillWith; }));
    }
    return a;
}
exports.fill = fill;
//# sourceMappingURL=create.js.map