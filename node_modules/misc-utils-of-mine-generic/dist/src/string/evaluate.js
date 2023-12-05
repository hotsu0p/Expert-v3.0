"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToObject = exports.evaluate = void 0;
function evaluate(s, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    try {
        return eval("(" + s + ")");
    }
    catch (error) {
        return defaultValue;
    }
}
exports.evaluate = evaluate;
/**
 * Transform a string like `foo: 2, bar: hello world` to an object like `{foo: '2', bar: 'hello world'}`
 */
function stringToObject(s, propSep, nameValueSep) {
    if (s === void 0) { s = ''; }
    if (propSep === void 0) { propSep = ','; }
    if (nameValueSep === void 0) { nameValueSep = ':'; }
    var a = s.split(propSep).map(function (s) { return s.trim(); });
    var o = {};
    a.forEach(function (f) {
        var b = f.split(nameValueSep).map(function (a) { return a.trim(); });
        if (b.length !== 2) {
            return;
        }
        o[b[0]] = b[1];
    });
    return o;
}
exports.stringToObject = stringToObject;
//# sourceMappingURL=evaluate.js.map