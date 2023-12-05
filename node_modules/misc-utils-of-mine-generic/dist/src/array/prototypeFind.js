"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installArrayPrototypeFind = exports.arrayPrototypeFind = void 0;
function arrayPrototypeFind(a, predicate, thisArg) {
    for (var i = 0; i < a.length; i++) {
        var v = a[i];
        if (predicate.apply(thisArg, [v, i, a])) {
            return v;
        }
    }
}
exports.arrayPrototypeFind = arrayPrototypeFind;
function installArrayPrototypeFind(force) {
    if (force === void 0) { force = false; }
    Array.prototype.find =
        typeof Array.prototype.find === 'undefined' || force
            ? function (predicate, thisArg) {
                //@ts- ignore
                return arrayPrototypeFind(this, predicate, thisArg);
            }
            : Array.prototype.find;
}
exports.installArrayPrototypeFind = installArrayPrototypeFind;
//# sourceMappingURL=prototypeFind.js.map