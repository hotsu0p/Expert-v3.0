"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.trimRightLines = exports.removeEmptyLines = exports.removeWhites = exports.shorter = void 0;
function shorter(text, much) {
    if (much === void 0) { much = 10; }
    return text.trim().substring(0, Math.min(text.length, much)) + '...';
}
exports.shorter = shorter;
function removeWhites(s, replaceWith) {
    if (replaceWith === void 0) { replaceWith = ' '; }
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;
function removeEmptyLines(c, newLine) {
    if (newLine === void 0) { newLine = '\n'; }
    return c
        .split(newLine)
        .filter(function (l) { return !!l.trim(); })
        .join(newLine);
}
exports.removeEmptyLines = removeEmptyLines;
function trimRightLines(s, newLine) {
    if (newLine === void 0) { newLine = '\n'; }
    return s
        .split(newLine)
        .map(function (l) { return l.trimRight(); })
        .join(newLine);
}
exports.trimRightLines = trimRightLines;
function capitalize(s) {
    if (!s) {
        return '';
    }
    return s.substring(0, 1).toUpperCase() + s.substring(1, s.length);
}
exports.capitalize = capitalize;
//# sourceMappingURL=whiteSpace.js.map