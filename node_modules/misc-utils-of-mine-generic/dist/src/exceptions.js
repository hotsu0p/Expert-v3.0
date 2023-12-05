"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryTo = exports.checkTruthy = exports.checkThrow = void 0;
function checkThrow(r, msg) {
    if (msg === void 0) { msg = 'Throwing on undefined value'; }
    if (!r) {
        throw new Error(msg);
    }
    return r;
}
exports.checkThrow = checkThrow;
function checkTruthy(r, msg) {
    if (msg === void 0) { msg = 'Throwing on undefined value'; }
    if (!r) {
        throw new Error(msg);
    }
    return true;
}
exports.checkTruthy = checkTruthy;
// let _f: Date|undefined
// if( checkTruthy(_f)){
// var f = _f
// }
function tryTo(f, def) {
    try {
        return f();
    }
    catch (error) {
        return def;
    }
}
exports.tryTo = tryTo;
//# sourceMappingURL=exceptions.js.map