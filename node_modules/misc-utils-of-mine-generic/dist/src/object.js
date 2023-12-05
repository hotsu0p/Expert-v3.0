"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectPropertyPaths = exports.setObjectProperty = exports.getObjectProperty = exports.arrayToObject = exports.objectOrderKeysAlphabetically = exports.objectFilter = exports.objectToArray = exports.objectMap = exports.objectMapValues = exports.objectKeys = void 0;
var array_1 = require("./array");
var type_1 = require("./type");
/**
 * Same as `Object.keys()` but with types.
 */
function objectKeys(o) {
    return Object.keys(o);
}
exports.objectKeys = objectKeys;
/**
 * Returns a new object with the same keys of given one, and values mapped with given function.
 */
function objectMapValues(o, p) {
    var r = {};
    objectKeys(o).forEach(function (k) {
        r[k] = p(k, o[k]);
    });
    return r;
}
exports.objectMapValues = objectMapValues;
exports.objectMap = objectMapValues;
function objectToArray(o) {
    return objectKeys(o).map(function (key) { return ({ key: key, value: o[key] }); });
}
exports.objectToArray = objectToArray;
function objectFilter(o, p) {
    var r = {};
    objectKeys(o)
        .filter(function (k, v) { return p(k, o[k]); })
        .forEach(function (k) {
        r[k] = o[k];
    });
    return r;
}
exports.objectFilter = objectFilter;
function objectOrderKeysAlphabetically(o) {
    var r = {};
    Object.keys(o).sort().forEach(function (k) {
        //@ts-ignore
        r[k] = o[k];
    });
    return r;
}
exports.objectOrderKeysAlphabetically = objectOrderKeysAlphabetically;
/**
 * Builds an object using keys in [[a]] and values returning from [[fn]] as long as they are not undefined.
 */
function arrayToObject(a, fn) {
    var o = {};
    a.filter(array_1.notUndefined).forEach(function (k) {
        o[k] = fn(k);
    });
    return o;
}
exports.arrayToObject = arrayToObject;
/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will
 * return `object['foo']['bar']`
 */
function getObjectProperty(object, path, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (!path) {
        return object;
    }
    else if (object) {
        var tokens = typeof path === 'string' ? path.split('.') : path, prev = object, n = 0;
        while (typeof prev !== 'undefined' && n < tokens.length) {
            prev = prev[tokens[n++]];
        }
        if (typeof prev !== 'undefined') {
            return prev;
        }
    }
    return defaultValue;
}
exports.getObjectProperty = getObjectProperty;
/**
 * sets a nested property on given path. For example path could be 'foo.bar' and it will set `object.foo.bar = value`.
 * If the path given as array contains numbers, then or those items arrays will be created instead of objects. For example:
 *
 * `setObjectProperty({}, ['foo', 0, 1, 'bar'], 'hello)`
 */
function setObjectProperty(object, path, value) {
    if (!path || !object) {
        throw new Error('Insufficient arguments');
    }
    var tokens = typeof path === 'string' ? path.split('.') : path, prev = object;
    if (tokens.length === 0) {
        Object.assign(object, value);
        return object;
    }
    for (var i = 0; i < tokens.length - 1; ++i) {
        var currentToken = tokens[i];
        if (typeof prev[currentToken] === 'undefined') {
            prev[currentToken] = typeof tokens[i + 1] === 'number' ? [] : {};
        }
        else {
            if (typeof tokens[i + 1] === 'number' && !Array.isArray(prev[currentToken])) {
                throw new Error("Detected number path item on non array value. Path: " + path + ", item: " + tokens[i + 1] + ", Value: " + prev[currentToken]);
            }
        }
        prev = prev[currentToken];
    }
    if (tokens.length) {
        prev[tokens[tokens.length - 1]] = value;
    }
    return object;
}
exports.setObjectProperty = setObjectProperty;
function getObjectPropertyPaths(object, options) {
    if (options === void 0) { options = { ignoreArrayElements: true, leafsOnly: false }; }
    function visit(object, p, p2) {
        if (p === void 0) { p = []; }
        if (p2 === void 0) { p2 = []; }
        var objectIsArray = type_1.isArray(object);
        if (options.ignoreArrayElements && objectIsArray) {
            return;
        }
        for (var i in object) {
            var v = object[i];
            var objectName = objectIsArray ? parseInt(i) : i + '';
            var p3 = __spreadArrays(p2, [objectName]);
            if (type_1.isObject(v) || type_1.isArray(v)) {
                visit(v, p, p3);
            }
            p.push(p3);
            p.push(p2);
        }
    }
    var p = [];
    var p2 = [];
    visit(object, p, p2);
    var result = p
        .filter(function (p, i, a) { return a.length && a.findIndex(function (o) { return JSON.stringify(o) === JSON.stringify(p); }) === i; })
        .sort(function (a, b) { return a.length - b.length; })
        .filter(function (a) { return a.length > 0; });
    if (options.leafsOnly) {
        return result.filter(function (p) {
            return !result.find(function (p2) { return p2 !== p && p2.length > p.length && JSON.stringify(p) === JSON.stringify(p2.slice(0, p.length)); });
        });
    }
    else {
        return result;
    }
}
exports.getObjectPropertyPaths = getObjectPropertyPaths;
//# sourceMappingURL=object.js.map