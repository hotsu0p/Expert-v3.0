"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatInstallArrayPrototype = exports.flatReadOnly = exports.flat = exports.flatDeep = void 0;
function flatDeep(arr) {
    return arr && arr.length ? arr.reduce(function (acc, val) { return (Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val)); }, []) : [];
}
exports.flatDeep = flatDeep;
function flat(arr) {
    return arr && arr.length ? arr.reduce(function (a, b) { return a.concat(b); }) : [];
}
exports.flat = flat;
function flatReadOnly(arr) {
    return arr && arr.length ? arr.reduce(function (a, b) { return a.concat(b); }) : [];
}
exports.flatReadOnly = flatReadOnly;
function flatInstallArrayPrototype() {
    if (typeof Array.prototype.flat === 'undefined') {
        Array.prototype.flat = function () {
            //@ts-ignore
            return flat(this);
        };
    }
}
exports.flatInstallArrayPrototype = flatInstallArrayPrototype;
//# sourceMappingURL=flat.js.map