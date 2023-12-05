"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map