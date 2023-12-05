"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOf = exports.isBoolean = exports.isString = exports.isArray = exports.isObject = exports.getType = void 0;
var toStr = Object.prototype.toString;
function getType(type) {
    return toStr.call(type);
}
exports.getType = getType;
function isObject(obj) {
    return typeof obj === 'object' && getType(obj) === '[object Object]';
}
exports.isObject = isObject;
exports.isArray = Array.isArray ||
    function (obj) {
        return toStr.call(obj) === '[object Array]';
    };
function isString(a) {
    return typeof a === 'string';
}
exports.isString = isString;
function isBoolean(obj) {
    return typeof obj === 'boolean' || getType(obj) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
/**
 * Get type of variable
 * @see http://jsperf.com/typeofvar
 */
function typeOf(input) {
    return {}.toString
        .call(input)
        .slice(8, -1)
        .toLowerCase();
}
exports.typeOf = typeOf;
//# sourceMappingURL=type.js.map