"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockFor = exports.withTime = exports.wait = exports.sleep = void 0;
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
}
exports.sleep = sleep;
exports.wait = sleep;
function withTime(label, fn) {
    console.time(label);
    var r = fn();
    console.timeEnd(label);
    return r;
}
exports.withTime = withTime;
/** blocks the thread for given ms. For testing purposes. */
function blockFor(ms) {
    if (ms === void 0) { ms = 1000; }
    var t0 = Date.now();
    while (Date.now() - t0 < ms) {
    }
}
exports.blockFor = blockFor;
//# sourceMappingURL=sleep.js.map