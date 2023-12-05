"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayDifference = exports.arrayInterception = exports.arrayUnion = exports.unionEquals = void 0;
var filter_1 = require("./filter");
function unionEquals(a, b, predicate, output) {
    if (predicate === void 0) { predicate = function (a, b) { return a === b; }; }
    var r = filter_1.dedup(__spreadArrays(a, b), predicate);
    output && output.push.apply(output, filter_1.dedup(__spreadArrays(r, output), predicate));
    return r;
}
exports.unionEquals = unionEquals;
exports.arrayUnion = unionEquals;
function arrayInterception(a, b, predicate, output) {
    if (predicate === void 0) { predicate = function (a, b) { return a === b; }; }
    var r = a.filter(function (a) { return b.find(function (b) { return predicate(a, b); }); });
    r = filter_1.dedup(r, predicate);
    output && output.push.apply(output, filter_1.dedup(__spreadArrays(r, output), predicate));
    return r;
}
exports.arrayInterception = arrayInterception;
function arrayDifference(a, b, predicate, output) {
    if (predicate === void 0) { predicate = function (a, b) { return a === b; }; }
    var r = a.filter(function (a) { return !b.find(function (b) { return predicate(a, b); }); }).concat(b.filter(function (b) { return !a.find(function (a) { return predicate(b, a); }); }));
    r = filter_1.dedup(r, predicate);
    output && output.push.apply(output, filter_1.dedup(__spreadArrays(r, output), predicate));
    return r;
}
exports.arrayDifference = arrayDifference;
//# sourceMappingURL=set.js.map