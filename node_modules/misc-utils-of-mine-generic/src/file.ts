export function bytesToKiloBytes(fileSizeInBytes: number) {
  return fileSizeInBytes / 1000.0
}

/**
 * Gets given path extension or empty string if any
 */
export function withoutExtension(f: string) {
  const i = slash(f).lastIndexOf('.')
  return i === -1 ? f : f.substring(0, i)
}

/**
 * Similar to node's' path.basename, returns the file name without folder and with the extension. 
 * Pass [[withoutExtension]] to remove it.
 */
export function basename(f: string, removeExtension = false) {
  const i = slash(f).lastIndexOf('/')
  var s = i === -1 ? f : f.substring(i + 1, f.length)
  return removeExtension ? withoutExtension(s) : s
}

/**
 * Gets given file path extension.
 */
export function getFileExtension(s: string) {
  const i = s.lastIndexOf('.')
  if (i == -1 || i === s.length - 1) {
    return ''
  }
  return s.substring(i + 1, s.length)
}

/**
 * Gets the directory path of given path converting `\\` path separator to `/`.
 */
export function dirname(path: string) {
  const i = slash(path).lastIndexOf('/')
  return i === -1 ? '' : path.substring(0, i)
}

/**
 * Given a source directory and a target file name, return the relative file path from source to target, converting `\\` path separator to `/`.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path from `source` to `target` (e.g. `"../../style.css"`), converting `\\` path separator to `/`.
 */
export function getRelativePath(source: string, target: string) {
  source = slash(source)
  target = slash(target)
  const sep = '/', //source.indexOf('/') !== -1 ? '/' : '\\',
    targetArr = target.split(sep),
    sourceArr = source.split(sep),
    filename = targetArr.pop(),
    targetPath = targetArr.join(sep)
  if (targetArr.length < 2 && sourceArr.length < 2) {
    return target
  }
  let relativePath = ''
  while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
    sourceArr.pop()
    relativePath += '..' + sep
  }
  const relPathArr = targetArr.slice(sourceArr.length)
  relPathArr.length && (relativePath += relPathArr.join(sep) + sep)
  return relativePath + filename
}

/**
 * Similar to node's' `path.join()`. It will return the path resulting of join given path parts, converting `\\` path separator to `/`.
 */
export function pathJoin(...parts: string[]) {
  var separator = '/'
  var replace = new RegExp(separator + '{1,}', 'g')
  return parts
    .filter(Boolean)
    .map(slash)
    .join(separator)
    .replace(replace, separator)
}

/**
 * Parses given .gitignore file contents to an array of string patterns. Adapted from https://github.com/sindresorhus/globby .
 */
export function parseGitIgnore(
  content: string,
  options: { cwd: string; fileName: string } = { cwd: '.', fileName: '.gitignore' }
) {
  const mapGitIgnorePatternTo = (base: string) => (ignore: string) => {
    if (ignore.startsWith('!')) {
      return '!' + pathJoin(base, ignore.slice(1))
    }
    return pathJoin(base, ignore)
  }
  const base = getRelativePath(options.cwd, dirname(options.fileName))
  return content
    .split(/\r?\n/)
    .filter(Boolean)
    .filter(line => line.charAt(0) !== '#')
    .map(mapGitIgnorePatternTo(base))
}

/**
 * Converts Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`. Adapted from https://github.com/sindresorhus/slash/ .
 */
export function slash(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path)
  if (isExtendedLengthPath || hasNonAscii) {
    return path
  }
  return path.replace(/\\/g, '/')
}

export function detectNewline(s: string, def = '\n') {
  const newlines = s.match(/(?:\r?\n)/g) || []
  if (newlines.length === 0) {
    return def
  }
  const crlf = newlines.filter(newline => newline === '\r\n').length
  const lf = newlines.length - crlf
  return crlf > lf ? '\r\n' : '\n'
}

export function withFinalSlash(s: string) {
  return s.endsWith('/') ? s : `${s}/`
}
