"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUniqueParam = exports.htmlElement = exports.stylePropertyNameToCssSyntax = exports.styleObjectToCss = exports.wrapInHtml = exports.unEscapeHtmlAttribute = exports.escapeHtmlAttribute = void 0;
var __1 = require("..");
function escapeHtmlAttribute(code) {
    return code.replace(/\"/gim, '&quot;');
}
exports.escapeHtmlAttribute = escapeHtmlAttribute;
function unEscapeHtmlAttribute(code) {
    return code.replace(/\&quot\;/gim, '"');
}
exports.unEscapeHtmlAttribute = unEscapeHtmlAttribute;
function wrapInHtml(s) {
    return "\n  <!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <title>title</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n" + s + "\n</body>\n</html>\n";
}
exports.wrapInHtml = wrapInHtml;
/**
 * transform an object like `{fooBar: 'value 123'}` to an string like `foo-bar: value 123`.
 */
function styleObjectToCss(o, propertiesSeparator) {
    if (propertiesSeparator === void 0) { propertiesSeparator = ''; }
    return Object.keys(o)
        .map(function (p) { return stylePropertyNameToCssSyntax(p) + ": " + o[p] + ";"; })
        .join(propertiesSeparator);
}
exports.styleObjectToCss = styleObjectToCss;
/**
 * Transform a string like `fooBar` to `foo-bar`
 */
function stylePropertyNameToCssSyntax(s) {
    var t;
    while ((t = /([A-Z])/.exec(s))) {
        s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
    }
    return s;
}
exports.stylePropertyNameToCssSyntax = stylePropertyNameToCssSyntax;
/**
 * ```
 * htmlElement({
      name: 'a',
      attributes: [{name: 'href', value: 'foo.com'}, {name: 'id', value: 'clickMe'}],
      innerHTML: 'click me'
    })
  ```
 * will return something like:
 *
 * ```
 * <a href="foo.com" id="clickMe">click me</a>
 * ```
 *
 * TODO: indentLevel
 */
function htmlElement(config) {
    var hasContent = config.forceContent || config.innerHTML || (config.children || []).length;
    var s = "<" + config.name;
    if (config.attributes) {
        // TODO: escape a.value
        s += ' ' + config.attributes.map(function (a) { return a.name + "=\"" + a.value + "\""; }).join(' ');
    }
    if (hasContent) {
        s += '>';
    }
    if (config.children) {
        var children = config.children.map(function (c) { return htmlElement(c); });
        s += "" + children.join('');
    }
    s += config.innerHTML || '';
    if (hasContent) {
        s += "</" + config.name + ">";
    }
    else {
        s += "/>";
    }
    return s;
}
exports.htmlElement = htmlElement;
/**
 * adds a parameter named `param` with a value that tries to be unique. The intending behavior is to add a "nocache" parameter
 */
function addUniqueParam(url, param) {
    var value = "" + (__1.counter() + Math.random()); //.replace(/\./g, '')
    if (url.includes('?')) {
        return url + "&" + param + "=" + value;
    }
    else {
        return url + "?" + param + "=" + value;
    }
}
exports.addUniqueParam = addUniqueParam;
//# sourceMappingURL=html.js.map