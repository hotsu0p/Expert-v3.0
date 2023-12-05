"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeText = void 0;
function changeText(text, toInsert) {
    var s = text.split('');
    var indexIncr = 0;
    toInsert.forEach(function (data) {
        data.toAdd = data.toAdd || '';
        data.toRemove = data.toRemove || '';
        s.splice.apply(s, __spreadArrays([data.pos + indexIncr, data.toRemove.length], data.toAdd.split('')));
        indexIncr += data.toAdd.length - data.toRemove.length;
    });
    return s.join('');
}
exports.changeText = changeText;
//# sourceMappingURL=change.js.map