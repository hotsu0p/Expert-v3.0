"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnumMap = exports.toObject = exports.enumValueFromString = exports.getEnumKeyAndValue = exports.getEnumKey = exports.enumNoValueKeys = exports.enumKeys = void 0;
/**
 * List given enum keys as array. Must be used on enums with declared values (enum E {a='a', b='b'}, if not
 * values could be also returned . For enums without declared values, use enumNoValueKeys
 */
function enumKeys(anEnum) {
    var a = [];
    for (var i in anEnum) {
        a.push(i);
    }
    return a;
}
exports.enumKeys = enumKeys;
/**
 * List given enum keys as array. Differently to [[enumKeys]], is should be used only on enums that doesn't
 * have assigned values or other wise on those which values are identical to the keys or not strings. If not,
 * they will be returned also!
 */
function enumNoValueKeys(anEnum) {
    return Object.keys(anEnum)
        .map(function (i) { return anEnum[i]; })
        .filter(function (s, i, a) { return typeof s === 'string' && a.indexOf(s) === i; });
}
exports.enumNoValueKeys = enumNoValueKeys;
/**
 * Returns the key of the first property with given value of given enum
 */
function getEnumKey(anEnum, value) {
    for (var key in anEnum) {
        if (value === anEnum[key]) {
            return key;
        }
    }
    return '';
}
exports.getEnumKey = getEnumKey;
/**
 * Return given enum as a {name, value} array.
 */
function getEnumKeyAndValue(e) {
    var a = [];
    for (var key in e) {
        a.push({ key: key, value: e[key] });
    }
    return a;
}
exports.getEnumKeyAndValue = getEnumKeyAndValue;
/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
function enumValueFromString(key, anEnum) {
    return anEnum[key];
}
exports.enumValueFromString = enumValueFromString;
/** Optimal array to dictionary de serialization because `array.reduce` and `Object.assign` are too slow for large collections. */
function toObject(array, groupByKey) {
    var obj = {};
    array.forEach(function (item) {
        //@ts-ignore
        obj[item[groupByKey]] = item;
    });
    return obj;
}
exports.toObject = toObject;
/**
 * From an enum like :
 * ```
 enum Providers {
    apple = 1,
    google = 2,
    facebook = 3,
  }
 * ```
  builds an object like this:
 * ```
  {
    apple: 1,
    google: 2,
    facebook: 3
  }
 * ```
  useful for in-code documentation/descriptions/validations
 */
function buildEnumMap(anEnum) {
    var r = {};
    getEnumKeyAndValue(anEnum).forEach(function (_a) {
        var key = _a.key, value = _a.value;
        if (isNaN(parseInt(key))) {
            r[key.toLowerCase()] = value;
        }
        else {
            r[parseInt(key)] = parseInt(key);
        }
    });
    return r;
}
exports.buildEnumMap = buildEnumMap;
//# sourceMappingURL=enumKeys.js.map