"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printMs = void 0;
function printMs(ms, config) {
    if (config === void 0) { config = { minutes: false, seconds: true, ms: true }; }
    config = __assign({ minutes: false, seconds: true, ms: true }, config);
    var seconds = config.seconds && Math.floor(ms / 1000);
    var minutes = config.minutes && seconds && (config.ms ? Math.floor(seconds / 60) : Math.round(seconds / 60));
    var milliseconds = config.ms && Math.floor(ms % 1000 || ms);
    return ("" + (minutes ? minutes + " minutes " : '') + (seconds ? seconds + " seconds " : '') + (milliseconds ? milliseconds + " ms " : '')).trim();
}
exports.printMs = printMs;
//# sourceMappingURL=printMs.js.map