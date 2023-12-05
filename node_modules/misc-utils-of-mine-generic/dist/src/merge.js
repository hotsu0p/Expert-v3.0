"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.mergeRecursive = exports.clone = exports.recursive = void 0;
/*!
 * @name JavaScript/NodeJS Merge v1.2.1
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge
 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */
var type_1 = require("./type");
/**
 * Merge two or more objects recursively.
 */
function recursive(clone) {
    //@ts-ignore
    return merge(clone === true, true, arguments);
}
exports.recursive = recursive;
/**
 * Clone the input removing any reference.
 */
function clone(input) {
    var output = input, type = type_1.typeOf(input), index, size;
    if (type === 'array') {
        output = [];
        size = input.length;
        for (index = 0; index < size; ++index)
            output[index] = clone(input[index]);
    }
    else if (type === 'object') {
        output = {};
        for (index in input)
            output[index] = clone(input[index]);
    }
    return output;
}
exports.clone = clone;
/**
 * Merges two objects recursively.
 */
function mergeRecursive(base, extend) {
    if (type_1.typeOf(base) !== 'object')
        return extend;
    for (var key in extend) {
        if (type_1.typeOf(base[key]) === 'object' && type_1.typeOf(extend[key]) === 'object') {
            base[key] = mergeRecursive(base[key], extend[key]);
        }
        else {
            base[key] = extend[key];
        }
    }
    return base;
}
exports.mergeRecursive = mergeRecursive;
/**
 * Mergestwo or more objects.
 */
function merge(clone_, recursive) {
    var argv = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        argv[_i - 2] = arguments[_i];
    }
    var result = argv[0], size = argv.length;
    if (clone_ || type_1.typeOf(result) !== 'object')
        result = {};
    for (var index = 0; index < size; ++index) {
        var item = argv[index], type = type_1.typeOf(item);
        if (type !== 'object')
            continue;
        for (var key in item) {
            if (key === '__proto__')
                continue;
            var sitem = clone_ ? clone(item[key]) : item[key];
            if (recursive) {
                result[key] = mergeRecursive(result[key], sitem);
            }
            else {
                result[key] = sitem;
            }
        }
    }
    return result;
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map