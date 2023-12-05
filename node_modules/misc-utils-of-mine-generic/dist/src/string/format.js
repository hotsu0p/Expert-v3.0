"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip = exports.wordWrap = exports.indent = exports.repeat = exports.unquote = exports.quote = void 0;
var array_1 = require("../array");
/**
 * wrap string with given quote character and escape it in the string. Useful to quote strings to be printed as json, sql values, etc.
 */
function quote(s, quote) {
    if (quote === void 0) { quote = '"'; }
    return quote + s.replace(new RegExp(quote, 'g'), '\\' + quote) + quote;
}
exports.quote = quote;
function unquote(s) {
    return s.substring(1, s.length - 1);
}
exports.unquote = unquote;
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i, tabSize) {
    if (i === void 0) { i = 1; }
    if (tabSize === void 0) { tabSize = 2; }
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function wordWrap(s, w, newLine) {
    if (newLine === void 0) { newLine = '\n'; }
    var n = newLine.replace(/\\/, '\\\\');
    return s.replace(new RegExp("(?![^" + n + "]{1," + w + "}$)([^" + n + "]{1," + w + "})\\s", 'g'), "$1" + newLine);
}
exports.wordWrap = wordWrap;
/**
 * strips ANSI codes from a string. From https://github.com/xpl/ansicolor/blob/master/ansicolor.js
 * @param {string} s a string containing ANSI escape codes.
 * @return {string} clean string.
 */
function strip(s) {
    return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, ''); // hope V8 caches the regexp
}
exports.strip = strip;
//# sourceMappingURL=format.js.map