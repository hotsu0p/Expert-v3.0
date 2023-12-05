"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareText = exports.compareTexts = void 0;
var array_1 = require("./array");
function compareTexts(actual, expected, options) {
    return compareWithMultiplicity(actual, expected, options, compareText);
}
exports.compareTexts = compareTexts;
function compareText(actual, expected, options) {
    if (actual === expected) {
        return options.negate ? negate(true) : true;
    }
    actual = buildText(actual, options);
    expected = buildText(expected, options);
    if (!options.verb || options.verb === 'contains') {
        return options.negate ? negate(actual.includes(expected)) : actual.includes(expected);
    }
    else if (options.verb === 'equals') {
        return options.negate ? negate(actual === expected) : actual === expected;
    }
    else if (options.verb === 'contained') {
        return options.negate ? negate(expected.includes(actual)) : expected.includes(actual);
    }
    else if (options.verb === 'endsWith') {
        return options.negate ? negate(actual.endsWith(expected)) : actual.endsWith(expected);
    }
    else if (options.verb === 'startsWith') {
        return options.negate ? negate(actual.startsWith(expected)) : actual.startsWith(expected);
    }
    else {
        return options.negate ? negate(false) : false;
    }
}
exports.compareText = compareText;
function compareWithMultiplicity(_actual, _expected, options, predicate) {
    var actual = array_1.asArray(_actual);
    var expected = array_1.asArray(_expected);
    if (actual === expected) {
        return options.negate ? negate(true) : true;
    }
    if (!options.multiplicity || options.multiplicity === 'anyOf') {
        var r = !!actual.find(function (a) { return !!expected.find(function (e) { return predicate(a, e, options); }); });
        return options.negate ? negate(r) : r;
    }
    else if (options.multiplicity === 'allOf') {
        var r = !actual.find(function (a) { return !expected.find(function (e) { return predicate(a, e, options); }); });
        return options.negate ? negate(r) : r;
    }
    else {
        return options.negate ? negate(false) : false;
    }
}
function negate(b) {
    return !b;
}
function buildText(text, options) {
    if (options.caseInsensitive) {
        text = text.toLowerCase();
    }
    if (options.asCode) {
        text = text.replace(/\s+/g, ' ').trim();
    }
    return text;
}
//# sourceMappingURL=compareText.js.map