"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobal = exports.isWebWorker = exports.isDOM = exports.inDOM = exports.isBrowser = exports.inBrowser = exports.inNode = exports.isJSDOM = exports.isNode = void 0;
function isNode() {
    return (typeof process !== 'undefined' &&
        typeof global !== 'undefined' &&
        typeof process.exit === 'function' &&
        typeof module !== 'undefined' &&
        typeof require === 'function' &&
        typeof require('f' + 's') !== 'undefined' &&
        typeof require('f' + 's').writeFileSync === 'function' &&
        typeof require('child_' + 'pro' + 'cess') !== 'undefined' &&
        typeof require('child_' + 'pro' + 'cess').execSync === 'function');
}
exports.isNode = isNode;
function isJSDOM() {
    return isNode() && exports.isDOM();
}
exports.isJSDOM = isJSDOM;
exports.inNode = isNode;
function inBrowser() {
    // @ts-ignore
    return (typeof window !== 'undefined' &&
        typeof document !== 'undefined' &&
        typeof Node !== 'undefined' &&
        document.nodeType === Node.DOCUMENT_NODE);
}
exports.inBrowser = inBrowser;
exports.isBrowser = inBrowser;
exports.inDOM = inBrowser;
exports.isDOM = inBrowser;
function isWebWorker() {
    // @ts-ignore
    return !exports.isDOM() && !isNode() && typeof self !== 'undefined' && typeof self.onmessage !== 'undefined';
}
exports.isWebWorker = isWebWorker;
//@ts-ignore
var _this = this;
function getGlobal() {
    // @ts-ignore
    return isWebWorker() ? self : isNode() ? global : exports.isBrowser() ? window : _this;
}
exports.getGlobal = getGlobal;
//# sourceMappingURL=environment.js.map