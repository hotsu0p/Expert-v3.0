"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyUndefined = exports.notSameNotFalsy = exports.notSame = exports.notFalsy = exports.notUndefined = exports.dedup = void 0;
/**
 * Remove duplicate items according to given predicate.
 */
function dedup(a, predicate) {
    return a.filter(function (n, i, a) { return i === a.findIndex(function (x) { return predicate(n, x); }); });
}
exports.dedup = dedup;
/**
 * Useful for filtering out undefined values without casting. like `array.filter(notUndefined)`.
 */
function notUndefined(n) {
    return n !== undefined;
}
exports.notUndefined = notUndefined;
/**
 * Useful for filtering out falsy values without casting. like `array.filter(notFalsy)`.
 */
function notFalsy(n) {
    return !!n;
}
exports.notFalsy = notFalsy;
/**
 * Use it to remove duplicates in array's filter expressions like `array.filter(notSame)`.
 */
function notSame(t, i, a) {
    return a.indexOf(t) === i;
}
exports.notSame = notSame;
/**
 * Use it remove duplicates and falsy values in filter() expressions like `array.filter(notSameNotFalsy)`.
 */
function notSameNotFalsy(t, i, a) {
    return a.indexOf(t) === i;
}
exports.notSameNotFalsy = notSameNotFalsy;
/**
 * Returns true if any item in given array is undefined.
 */
function anyUndefined() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return !!a.find(function (a) { return typeof a === 'undefined'; });
}
exports.anyUndefined = anyUndefined;
//# sourceMappingURL=filter.js.map