"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = exports.isAbsoluteUrl = exports.getParametersFromUrl = exports.getFileNameFromUrl = void 0;
function getFileNameFromUrl(url) {
    var hashIndex = url.indexOf('#');
    url = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
    return (url.split('/').pop() || '').replace(/[\?].*$/g, '');
}
exports.getFileNameFromUrl = getFileNameFromUrl;
function getParametersFromUrl(url, options) {
    if (options === void 0) { options = {}; }
    var queryString = url.split('?')[1];
    var obj = {};
    if (!queryString) {
        return obj;
    }
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');
        var value = a[1] || '';
        if (options.parseNumber) {
            var numeric = parseFloat(value);
            if (!isNaN(numeric)) {
                value = numeric;
            }
        }
        if (options.parseBoolean) {
            if (['true', 'false'].includes(value)) {
                value = value === 'true' ? true : false;
            }
        }
        obj[a[0]] = value;
    }
    return obj;
}
exports.getParametersFromUrl = getParametersFromUrl;
/**
 * Returns true iff given url starts with a protocol ("http://", "https://", etc).
 * Notice that this is not strictly the absolute url definition
 */
function isAbsoluteUrl(url) {
    return !!url.match(/^[^:]+:\/\//);
}
exports.isAbsoluteUrl = isAbsoluteUrl;
/**
 * Parse url, emulates window.location format
 */
function parseUrl(url, options) {
    if (options === void 0) { options = {}; }
    var isAbsolute = isAbsoluteUrl(url);
    if (!isAbsolute) {
        url = 'http://foo.com' + (url.startsWith('/') ? '' : '/') + url;
    }
    var results = /^([^:]+:)\/\/([^\/]+)(.*)/.exec(url);
    if (!results) {
        return null;
    }
    var all = results[0], protocol = results[1], domain = results[2], rest = results[3];
    var pathname = rest;
    var i = pathname.indexOf('?');
    if (i !== -1) {
        pathname = pathname.substring(0, i);
    }
    // case no params: http://foo.com/bar#hash
    i = pathname.indexOf('#');
    if (i !== -1) {
        pathname = pathname.substring(0, i);
    }
    var search = '';
    i = rest.indexOf('?');
    if (i !== -1) {
        search = rest.substring(i);
        i = search.indexOf('#');
        if (i !== -1) {
            search = search.substring(0, i);
        }
    }
    var hash = '';
    i = rest.indexOf('#'); // yes we're doing it twice
    if (i !== -1) {
        hash = rest.substring(i);
    }
    if (!isAbsolute) {
        domain = '';
        protocol = '';
    }
    return {
        protocol: protocol,
        domain: domain,
        pathname: pathname,
        search: search,
        hash: hash,
        params: options.parseParams ? getParametersFromUrl(url) : undefined
    };
}
exports.parseUrl = parseUrl;
//# sourceMappingURL=url.js.map