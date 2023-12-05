"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFinalSlash = exports.detectNewline = exports.slash = exports.parseGitIgnore = exports.pathJoin = exports.getRelativePath = exports.dirname = exports.getFileExtension = exports.basename = exports.withoutExtension = exports.bytesToKiloBytes = void 0;
function bytesToKiloBytes(fileSizeInBytes) {
    return fileSizeInBytes / 1000.0;
}
exports.bytesToKiloBytes = bytesToKiloBytes;
/**
 * Gets given path extension or empty string if any
 */
function withoutExtension(f) {
    var i = slash(f).lastIndexOf('.');
    return i === -1 ? f : f.substring(0, i);
}
exports.withoutExtension = withoutExtension;
/**
 * Similar to node's' path.basename, returns the file name without folder and with the extension.
 * Pass [[withoutExtension]] to remove it.
 */
function basename(f, removeExtension) {
    if (removeExtension === void 0) { removeExtension = false; }
    var i = slash(f).lastIndexOf('/');
    var s = i === -1 ? f : f.substring(i + 1, f.length);
    return removeExtension ? withoutExtension(s) : s;
}
exports.basename = basename;
/**
 * Gets given file path extension.
 */
function getFileExtension(s) {
    var i = s.lastIndexOf('.');
    if (i == -1 || i === s.length - 1) {
        return '';
    }
    return s.substring(i + 1, s.length);
}
exports.getFileExtension = getFileExtension;
/**
 * Gets the directory path of given path converting `\\` path separator to `/`.
 */
function dirname(path) {
    var i = slash(path).lastIndexOf('/');
    return i === -1 ? '' : path.substring(0, i);
}
exports.dirname = dirname;
/**
 * Given a source directory and a target file name, return the relative file path from source to target, converting `\\` path separator to `/`.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path from `source` to `target` (e.g. `"../../style.css"`), converting `\\` path separator to `/`.
 */
function getRelativePath(source, target) {
    source = slash(source);
    target = slash(target);
    var sep = '/', //source.indexOf('/') !== -1 ? '/' : '\\',
    targetArr = target.split(sep), sourceArr = source.split(sep), filename = targetArr.pop(), targetPath = targetArr.join(sep);
    if (targetArr.length < 2 && sourceArr.length < 2) {
        return target;
    }
    var relativePath = '';
    while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
        sourceArr.pop();
        relativePath += '..' + sep;
    }
    var relPathArr = targetArr.slice(sourceArr.length);
    relPathArr.length && (relativePath += relPathArr.join(sep) + sep);
    return relativePath + filename;
}
exports.getRelativePath = getRelativePath;
/**
 * Similar to node's' `path.join()`. It will return the path resulting of join given path parts, converting `\\` path separator to `/`.
 */
function pathJoin() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    var separator = '/';
    var replace = new RegExp(separator + '{1,}', 'g');
    return parts
        .filter(Boolean)
        .map(slash)
        .join(separator)
        .replace(replace, separator);
}
exports.pathJoin = pathJoin;
/**
 * Parses given .gitignore file contents to an array of string patterns. Adapted from https://github.com/sindresorhus/globby .
 */
function parseGitIgnore(content, options) {
    if (options === void 0) { options = { cwd: '.', fileName: '.gitignore' }; }
    var mapGitIgnorePatternTo = function (base) { return function (ignore) {
        if (ignore.startsWith('!')) {
            return '!' + pathJoin(base, ignore.slice(1));
        }
        return pathJoin(base, ignore);
    }; };
    var base = getRelativePath(options.cwd, dirname(options.fileName));
    return content
        .split(/\r?\n/)
        .filter(Boolean)
        .filter(function (line) { return line.charAt(0) !== '#'; })
        .map(mapGitIgnorePatternTo(base));
}
exports.parseGitIgnore = parseGitIgnore;
/**
 * Converts Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`. Adapted from https://github.com/sindresorhus/slash/ .
 */
function slash(path) {
    var isExtendedLengthPath = /^\\\\\?\\/.test(path);
    var hasNonAscii = /[^\u0000-\u0080]+/.test(path);
    if (isExtendedLengthPath || hasNonAscii) {
        return path;
    }
    return path.replace(/\\/g, '/');
}
exports.slash = slash;
function detectNewline(s, def) {
    if (def === void 0) { def = '\n'; }
    var newlines = s.match(/(?:\r?\n)/g) || [];
    if (newlines.length === 0) {
        return def;
    }
    var crlf = newlines.filter(function (newline) { return newline === '\r\n'; }).length;
    var lf = newlines.length - crlf;
    return crlf > lf ? '\r\n' : '\n';
}
exports.detectNewline = detectNewline;
function withFinalSlash(s) {
    return s.endsWith('/') ? s : s + "/";
}
exports.withFinalSlash = withFinalSlash;
//# sourceMappingURL=file.js.map