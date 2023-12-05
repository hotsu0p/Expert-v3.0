"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClassConstructorFunction = exports.isGeneratorFunction = exports.isGenerator = void 0;
/**
 * Check whether an object is a generator.
 */
function isGenerator(obj) {
    return obj && typeof obj.next === 'function' && typeof obj.throw === 'function';
}
exports.isGenerator = isGenerator;
/**
 * Check whether a function is generator.
 */
function isGeneratorFunction(fn) {
    return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
exports.isGeneratorFunction = isGeneratorFunction;
function isClassConstructorFunction(a) {
    return a && a.prototype && a.prototype.constructor && (a.prototype.constructor.toString().startsWith('class'));
}
exports.isClassConstructorFunction = isClassConstructorFunction;
//# sourceMappingURL=function.js.map