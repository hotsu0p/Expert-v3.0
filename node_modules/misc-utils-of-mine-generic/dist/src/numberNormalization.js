"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bin2dec = exports.dec2bin = exports.decimalDigitNormalizer = exports.binaryDigitNormalizer = exports.binaryStraightNormalizer = void 0;
var create_1 = require("./array/create");
exports.binaryStraightNormalizer = {
    encode: function (a, inputSize) {
        var bin = dec2bin(a);
        inputSize = typeof inputSize === 'undefined' ? bin.length : inputSize;
        if (bin.length > inputSize) {
            throw new Error('Number greater than input size');
        }
        return __spreadArrays(create_1.array(inputSize - bin.length).map(function (i) { return 0; }), bin);
    },
    decode: function (a) {
        return bin2dec(a);
    }
};
var digitLength = dec2bin(9).length;
exports.binaryDigitNormalizer = {
    encode: function (a, inputSize) {
        var bin = ("" + a).split('').map(function (i) { return parseInt(i, 10); }).map(function (i) { return dec2bin(i, digitLength); }).flat();
        inputSize = typeof inputSize === 'undefined' ? bin.length : inputSize;
        if (bin.length > inputSize) {
            throw new Error('Number greater than input size');
        }
        return __spreadArrays(create_1.array(inputSize - bin.length).map(function (i) { return 0; }), bin);
    },
    decode: function (input) {
        return create_1.arrayRangePartition(input, digitLength, 0).reverse().map(function (digit) { return bin2dec(digit); }).reduce(function (acc, v, i) { return acc + v * Math.pow(10, i); });
    }
};
exports.decimalDigitNormalizer = {
    encode: function (n, length) {
        var r = ("" + n).split('').map(function (i) { return (parseInt(i) / 10); });
        if (length && r.length > length) {
            throw new Error('greater than length');
        }
        if (length && r.length < length) {
            r = __spreadArrays(create_1.array(length - r.length).map(function (i) { return 0; }), r);
        }
        return r;
    },
    decode: function (digits) {
        return parseInt(digits.map(function (d) { return Math.round(d * 10); }).join(''));
    }
};
function ConvertBase(num) {
    return {
        from: function (baseFrom) {
            return {
                to: function (baseTo) {
                    return parseInt(num, baseFrom).toString(baseTo);
                }
            };
        }
    };
}
function bin2dec_(num) {
    return ConvertBase(num).from(2).to(10);
}
function dec2bin_(num) {
    return ConvertBase(num).from(10).to(2);
}
function string2array(s) {
    var numbers = [];
    for (var i = 0; i < s.length; i++) {
        numbers.push(Math.round(parseFloat(s[i])));
    }
    return numbers;
}
function dec2bin(number, arrayLength) {
    var a = string2array(dec2bin_(number));
    if (arrayLength) {
        if (a.length > arrayLength) {
            throw new Error('array length already exceeded by input');
        }
        var diff = arrayLength - a.length;
        for (var i = 0; i < diff; i++) {
            a.unshift(0);
        }
    }
    return a;
}
exports.dec2bin = dec2bin;
function bin2dec(number) {
    return Math.round(parseFloat(bin2dec_(number.join(''))));
}
exports.bin2dec = bin2dec;
//# sourceMappingURL=numberNormalization.js.map