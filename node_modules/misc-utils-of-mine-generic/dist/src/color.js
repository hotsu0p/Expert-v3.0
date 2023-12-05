"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCssColor = exports.rgb2Hex = void 0;
var number_1 = require("./number");
/**
 * Transforms a color string like `rgb(0,0,0)` to a color string in hex syntax like `#000000`
 */
function rgb2Hex(s) {
    //@ts-ignore
    return s.match(/[0-9]+/g).reduce(function (a, b) { return a + (b | 256).toString(16).slice(1); }, '#').toString(16);
}
exports.rgb2Hex = rgb2Hex;
function randomCssColor() {
    return "rgb(" + number_1.randomIntBetween(0, 255) + ", " + number_1.randomIntBetween(0, 255) + ", " + number_1.randomIntBetween(0, 255) + ")";
}
exports.randomCssColor = randomCssColor;
//# sourceMappingURL=color.js.map