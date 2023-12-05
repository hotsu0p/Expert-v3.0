"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easing = exports.animate = void 0;
var type_1 = require("../type");
function animate(_a) {
    var duration = _a.duration, draw = _a.draw, timing = _a.timing, lapse = _a.lapse, end = _a.end;
    return new Promise(function (resolve) {
        if (type_1.isObject(timing)) {
            timing = timing.fn(duration);
        }
        var start = Date.now();
        var progress = 0;
        requestAnimationFrame(function anim(time) {
            var timeFraction = (time - start) / duration;
            if (timeFraction > 1)
                timeFraction = 1;
            progress = timing(timeFraction, time - start, duration);
            draw(progress);
            if (timeFraction < 1) {
                requestAnimationFrame(anim, lapse);
            }
            else {
                end && end();
                resolve();
            }
        });
    });
}
exports.animate = animate;
function requestAnimationFrame(f, lapse) {
    if (lapse === void 0) { lapse = 0; }
    setTimeout(function () { return f(Date.now()); }, lapse);
}
var easing;
(function (easing) {
    function makeEaseOut(timing) {
        return function (timeFraction) {
            return 1 - timing(1 - timeFraction);
        };
    }
    function bounceFn(timeFraction) {
        for (var a = 0, b_1 = 1, result = void 0; 1; a += b_1, b_1 /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b_1, 2);
            }
        }
    }
    /**
     * Imagine we are dropping a ball. It falls down, then bounces back a few times and stops. The bounce function does the same, but in the reverse order: “bouncing” starts immediately.
     * */
    easing.bounceEasyOut = function () { return makeEaseOut(bounceFn); };
    /**
     * parabolic curve
     */
    function quad(timeFraction) {
        return Math.pow(timeFraction, 2);
    }
    easing.quad = quad;
    /**
     * “bow shooting”. First we “pull the bowstring”, and then “shoot”.
     * @param x “elasticity coefficient”. The distance of “bowstring pulling” is defined by it. Default value 1.5.
     */
    easing.back = function (x) {
        if (x === void 0) { x = 1.5; }
        return function (timeFraction) { return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x); };
    };
    /**
     * @param x “initial range”
     */
    easing.elastic = function (x) {
        if (x === void 0) { x = 1.5; }
        return function (timeFraction) {
            return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(((20 * Math.PI * x) / 3) * timeFraction);
        };
    };
    function makeEaseInOut(timing) {
        return function (timeFraction) {
            if (timeFraction < 0.5)
                return timing(2 * timeFraction) / 2;
            else
                return (2 - timing(2 * (1 - timeFraction))) / 2;
        };
    }
    easing.bounceEaseInOut = function () { return makeEaseInOut(bounceFn); };
    var c = 1;
    var b = 0;
    easing.easeInQuad = function () { return ({ fn: function (d) { return function (x, t) { return c * (t /= d) * t + b; }; } }); };
    easing.easeOutQuad = function () { return ({ fn: function (d) { return function (x, t) { return -c * (t /= d) * (t - 2) + b; }; } }); };
    easing.easeInOutQuad = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if ((t /= d / 2) < 1)
                    return (c / 2) * t * t + b;
                return (-c / 2) * (--t * (t - 2) - 1) + b;
            }; }
        });
    };
    easing.easeInElastic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!p)
                    p = d * 0.3;
                if (a < Math.abs(c)) {
                    a = c;
                    var s_1 = p / 4;
                }
                else {
                    s = (p / (2 * Math.PI)) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
            }; }
        });
    };
    easing.easeOutBounce = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if ((t /= d) < 1 / 2.75) {
                    return c * (7.5625 * t * t) + b;
                }
                else if (t < 2 / 2.75) {
                    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
                }
                else if (t < 2.5 / 2.75) {
                    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
                }
                else {
                    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
                }
            }; }
        });
    };
    easing.easeInCubic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return c * (t /= d) * t * t + b;
            }; }
        });
    };
    easing.easeOutCubic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            }; }
        });
    };
    easing.easeInOutCubic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if ((t /= d / 2) < 1)
                    return (c / 2) * t * t * t + b;
                return (c / 2) * ((t -= 2) * t * t + 2) + b;
            }; }
        });
    };
    easing.easeInQuart = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return c * (t /= d) * t * t * t + b;
            }; }
        });
    };
    easing.easeInOutQuart = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if ((t /= d / 2) < 1)
                    return (c / 2) * t * t * t * t + b;
                return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
            }; }
        });
    };
    easing.easeInQuint = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return c * (t /= d) * t * t * t * t + b;
            }; }
        });
    };
    easing.easeOutQuint = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            }; }
        });
    };
    easing.easeInExpo = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            }; }
        });
    };
    easing.easeInOutQuint = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if ((t /= d / 2) < 1)
                    return (c / 2) * t * t * t * t * t + b;
                return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
            }; }
        });
    };
    easing.easeInSine = function () {
        return ({
            fn: function (d) { return function (x, t) {
                return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
            }; }
        });
    };
    easing.easeInOutElastic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0)
                    return b;
                if ((t /= d / 2) == 2)
                    return b + c;
                if (!p)
                    p = d * (0.3 * 1.5);
                if (a < Math.abs(c)) {
                    a = c;
                    var s_2 = p / 4;
                }
                else {
                    s = (p / (2 * Math.PI)) * Math.asin(c / a);
                }
                if (t < 1)
                    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b;
            }; }
        });
    };
    easing.easeOutElastic = function () {
        return ({
            fn: function (d) { return function (x, t) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!p)
                    p = d * 0.3;
                if (a < Math.abs(c)) {
                    a = c;
                    var s_3 = p / 4;
                }
                else {
                    s = (p / (2 * Math.PI)) * Math.asin(c / a);
                }
                return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
            }; }
        });
    };
    easing.easeInOutExpo = function () {
        return ({
            fn: function (d) { return function (x, t) {
                if (t == 0)
                    return b;
                if (t == d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
                return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
            }; }
        });
    };
    easing.easeInOutBack = function () {
        return ({
            fn: function (d) { return function (x, t) {
                var s = 1.70158;
                if ((t /= d / 2) < 1)
                    return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
                return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
            }; }
        });
    };
    easing.easeOutBack = function () {
        return ({
            fn: function (d) { return function (x, t, d) {
                var s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            }; }
        });
    };
    easing.easeInBounce = function () {
        return ({
            fn: function (d) { return function (x, t, d) {
                return c - easing.easeOutBounce().fn(d)(x, d - t, 0, c, d) + b;
            }; }
        });
    };
    easing.easeInOutBounce = function () {
        return ({
            fn: function (d) { return function (x, t, d) {
                if (t < d / 2)
                    return easing.easeInBounce().fn(d)(x, t * 2, 0, c, d) * 0.5 + b;
                return easing.easeOutBounce().fn(d)(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            }; }
        });
    };
})(easing = exports.easing || (exports.easing = {}));
// animate({
//   duration: 2000,
//   timing: easeInQuad(),
//   lapse: 20,
//   draw(progress) {
//   console.log(progress * 100 + '%');
//   }
// });
// TODO:
// easeInOutSine: function (x, t, b, c, d) {
// 	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
// },
// easeOutExpo: function (x, t, b, c, d) {
// 	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
// },
// easeInCirc: function (x, t, b, c, d) {
// 	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
// },
// easeOutCirc: function (x, t, b, c, d) {
// 	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
// },
// easeInOutCirc: function (x, t, b, c, d) {
// 	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
// 	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
// },
// easeInBack: function (x, t, b, c, d, s) {
// 	if (s == undefined) s = 1.70158;
// 	return c*(t/=d)*t*((s+1)*t - s) + b;
// },
// easeInBounce: function (x, t, b, c, d) {
// 	return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
// },
// easeInOutBounce: function (x, t, b, c, d) {
// 	if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
// 	return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
// }
// animate({
//   duration: 1000,
//   timing(timeFraction) {
//     return timeFraction;
//   },
//   draw(progress) {
//   console.log(progress * 100 + '%');
//   }
// });
// setImmediate((t)=>{
//   console.log(t);
// })
// function requestAnimationFrame(f){
//   setImmediate(()=>f(Date.now()))
// }
// function animate({duration, draw, timing}) {
//   let start = performance.now();
//   requestAnimationFrame(function animate(time) {
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;
//     let progress = timing(timeFraction)
//     draw(progress);
//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }
//   });
// }
// The code for it:
//# sourceMappingURL=anim.js.map