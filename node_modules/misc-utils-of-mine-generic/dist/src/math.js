"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.average = void 0;
exports.average = function (arr) { return arr.reduce(function (a, b) { return a + b; }, 0) / arr.length; };
exports.median = function (arr) {
    var mid = Math.floor(arr.length / 2), nums = __spreadArrays(arr).sort(function (a, b) { return a - b; });
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
//# sourceMappingURL=math.js.map