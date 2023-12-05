"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoxChar = exports.BorderSide = exports.borderStyles = exports.BorderStyle = void 0;
var array_1 = require("../array");
var BorderStyle;
(function (BorderStyle) {
    BorderStyle["light"] = "light";
    BorderStyle["double"] = "double";
    BorderStyle["round"] = "round";
    BorderStyle["heavy"] = "heavy";
    BorderStyle["lightDouble"] = "lightDouble";
    BorderStyle["doubleLight"] = "doubleLight";
    BorderStyle["classic"] = "classic";
    BorderStyle["lightTripleDash"] = "lightTripleDash";
    BorderStyle["lightQuadrupleDash"] = "lightQuadrupleDash";
    BorderStyle["lightDoubleDash"] = "lightDoubleDash";
    BorderStyle["heavier"] = "heavier";
    BorderStyle["roundDoubleDash"] = "roundDoubleDash";
    BorderStyle["roundTripleDash"] = "roundTripleDash";
    BorderStyle["roundQuadrupleDash"] = "roundQuadrupleDash";
    BorderStyle["heavyDoubleDash"] = "heavyDoubleDash";
    BorderStyle["heavyTripleDash"] = "heavyTripleDash";
    BorderStyle["heavyQuadrupleDash"] = "heavyQuadrupleDash";
    BorderStyle["singleRareCorners"] = "singleRareCorners";
    BorderStyle["triangleCorners"] = "triangleCorners";
    // 'round2' = 'round2',
    // 'round3' = 'round3',
})(BorderStyle = exports.BorderStyle || (exports.BorderStyle = {}));
exports.borderStyles = array_1.enumKeys(BorderStyle);
var BorderSide;
(function (BorderSide) {
    BorderSide["topLeft"] = "topLeft";
    BorderSide["topRight"] = "topRight";
    BorderSide["bottomRight"] = "bottomRight";
    BorderSide["bottomLeft"] = "bottomLeft";
    BorderSide["left"] = "left";
    BorderSide["bottom"] = "bottom";
    BorderSide["top"] = "top";
    BorderSide["right"] = "right";
})(BorderSide = exports.BorderSide || (exports.BorderSide = {}));
// export function getBoxStyle(s: BorderStyle) {
//   return getBoxStyles()[s]
// }
function getBoxChar(s, si) {
    return getBoxStyles()[s][si];
}
exports.getBoxChar = getBoxChar;
var boxStyles;
var getBoxStyles = function () {
    if (!boxStyles) {
        boxStyles = {
            light: {
                topLeft: '┌',
                topRight: '┐',
                bottomRight: '┘',
                bottomLeft: '└',
                left: '│',
                right: '│',
                bottom: '─',
                top: '─'
            },
            lightTripleDash: {
                topLeft: '┌',
                topRight: '┐',
                bottomRight: '┘',
                bottomLeft: '└',
                left: '┆',
                right: '┆',
                bottom: '┄',
                top: '┄'
            },
            lightQuadrupleDash: {
                topLeft: '┌',
                topRight: '┐',
                bottomRight: '┘',
                bottomLeft: '└',
                left: '┊',
                right: '┊',
                bottom: '┈',
                top: '┈'
            },
            lightDoubleDash: {
                topLeft: '┌',
                topRight: '┐',
                bottomRight: '┘',
                bottomLeft: '└',
                left: '╎',
                right: '╎',
                bottom: '╌',
                top: '╌'
            },
            double: {
                topLeft: '╔',
                topRight: '╗',
                bottomRight: '╝',
                bottomLeft: '╚',
                left: '║',
                right: '║',
                bottom: '═',
                top: '═'
            },
            round: {
                topLeft: '╭',
                topRight: '╮',
                bottomRight: '╯',
                bottomLeft: '╰',
                left: '│',
                right: '│',
                bottom: '─',
                top: '─'
            },
            roundDoubleDash: {
                topLeft: '╭',
                topRight: '╮',
                bottomRight: '╯',
                bottomLeft: '╰',
                left: '╎',
                right: '╎',
                bottom: '╌',
                top: '╌'
            },
            roundTripleDash: {
                topLeft: '╭',
                topRight: '╮',
                bottomRight: '╯',
                bottomLeft: '╰',
                left: '┆',
                right: '┆',
                bottom: '┄',
                top: '┄'
            },
            roundQuadrupleDash: {
                topLeft: '╭',
                topRight: '╮',
                bottomRight: '╯',
                bottomLeft: '╰',
                left: '┊',
                right: '┊',
                bottom: '┈',
                top: '┈'
            },
            heavy: {
                topLeft: '┏',
                topRight: '┓',
                bottomRight: '┛',
                bottomLeft: '┗',
                left: '┃',
                right: '┃',
                bottom: '━',
                top: '━'
            },
            heavyDoubleDash: {
                topLeft: '┏',
                topRight: '┓',
                bottomRight: '┛',
                bottomLeft: '┗',
                left: '╏',
                right: '╏',
                bottom: '╍',
                top: '╍'
            },
            heavyTripleDash: {
                topLeft: '┏',
                topRight: '┓',
                bottomRight: '┛',
                bottomLeft: '┗',
                left: '┇',
                right: '┇',
                bottom: '┅',
                top: '┅'
            },
            heavyQuadrupleDash: {
                topLeft: '┏',
                topRight: '┓',
                bottomRight: '┛',
                bottomLeft: '┗',
                left: '┋',
                right: '┋',
                bottom: '┉',
                top: '┉'
            },
            heavier: {
                topLeft: '▛',
                topRight: '▜',
                bottomRight: '▟',
                bottomLeft: '▙',
                left: '▌',
                right: '▐',
                bottom: '▄',
                top: '▀'
            },
            lightDouble: {
                topLeft: '╓',
                topRight: '╖',
                bottomRight: '╜',
                bottomLeft: '╙',
                left: '║',
                right: '║',
                bottom: '─',
                top: '─'
            },
            singleRareCorners: {
                bottom: '⎽',
                top: '⎺',
                left: '⎢',
                right: '⎥',
                topLeft: '⎡',
                topRight: '⎤',
                bottomRight: '⎦',
                bottomLeft: '⎣'
            },
            triangleCorners: {
                bottom: '_',
                top: '⎻',
                left: '⎸',
                right: ' ⎸',
                topLeft: '◸',
                topRight: '◹',
                bottomRight: '◿',
                bottomLeft: '◺'
            },
            doubleLight: {
                topLeft: '╒',
                topRight: '╕',
                bottomRight: '╛',
                bottomLeft: '╘',
                left: '│',
                right: '│',
                bottom: '═',
                top: '═'
            },
            classic: {
                topLeft: '+',
                topRight: '+',
                bottomRight: '+',
                bottomLeft: '+',
                left: '|',
                right: '|',
                bottom: '═',
                top: '-'
            }
        };
    }
    return boxStyles;
};
//# sourceMappingURL=boxes.js.map