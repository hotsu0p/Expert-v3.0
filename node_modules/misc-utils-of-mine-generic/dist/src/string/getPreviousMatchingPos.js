"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = exports.getPreviousMatchingPos = void 0;
/**
 * Get index of the previous match of given predicate or substring, before given pos, on given text. For the next matching position you can use `String.prototype.findIndexOf` function.
 */
function getPreviousMatchingPos(text, pos, predicate) {
    pos = text.length <= pos ? text.length : pos;
    if (typeof predicate === 'string') {
        var s_1 = predicate;
        predicate = function (c) { return c === s_1; };
    }
    while (pos >= 0) {
        var char = text[pos];
        if (!predicate(char)) {
            pos--;
        }
        else {
            break;
        }
    }
    return pos;
}
exports.getPreviousMatchingPos = getPreviousMatchingPos;
/**
 * Gets index of n-th match of given substring on given string.
 */
function getPosition(string, subString, n) {
    return string.split(subString, n).join(subString).length;
}
exports.getPosition = getPosition;
//# sourceMappingURL=getPreviousMatchingPos.js.map