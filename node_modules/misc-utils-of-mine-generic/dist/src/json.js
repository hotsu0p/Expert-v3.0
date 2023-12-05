"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJSONObject = exports.findJson = exports.visitJson = exports.cloneJSON = exports.stringifyJSON = exports.parseJSON = void 0;
var object_1 = require("./object");
var type_1 = require("./type");
/** try to parse given json string. return undefined in case there is an error. */
function parseJSON(s, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    try {
        return JSON.parse(s);
    }
    catch (error) {
        return defaultValue;
    }
}
exports.parseJSON = parseJSON;
function stringifyJSON(s, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    try {
        return JSON.stringify(s);
    }
    catch (error) {
        return defaultValue;
    }
}
exports.stringifyJSON = stringifyJSON;
function cloneJSON(a) {
    return JSON.parse(JSON.stringify(a));
}
exports.cloneJSON = cloneJSON;
function visitJson(o, v, _name) {
    if (type_1.isArray(o) && o) {
        return v(o, _name) || o.some(function (va, i) { return visitJson(va, v, i); });
    }
    else if (typeof o === 'object' && o) {
        return v(o, _name) || object_1.objectToArray(o).some(function (o) { return visitJson(o.value, v, o.key); });
    }
    else {
        return v(o, _name);
    }
}
exports.visitJson = visitJson;
function findJson(o, p, _name) {
    var r = undefined;
    visitJson(o, function (value, key) {
        if (p(value, key)) {
            r = { value: value, key: key };
            return true;
        }
        return false;
    });
    return r;
}
exports.findJson = findJson;
function isJSONObject(o) {
    return typeof o === 'object' && !Array.isArray(o);
}
exports.isJSONObject = isJSONObject;
//# sourceMappingURL=json.js.map