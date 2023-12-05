import { array } from '../array'

/**
 * wrap string with given quote character and escape it in the string. Useful to quote strings to be printed as json, sql values, etc.
 */
export function quote(s: string, quote: string = '"'): string {
  return quote + s.replace(new RegExp(quote, 'g'), '\\' + quote) + quote
}

export function unquote(s: string) {
  return s.substring(1, s.length - 1)
}

export function repeat(n: number, s: string): string {
  return array(n, s).join('')
}

export function indent(i: number = 1, tabSize = 2): string {
  return repeat(i * tabSize, ' ')
}

export function wordWrap(s: string, w: number, newLine = '\n') {
  const n = newLine.replace(/\\/, '\\\\')
  return s.replace(new RegExp(`(?![^${n}]{1,${w}}$)([^${n}]{1,${w}})\\s`, 'g'), `$1${newLine}`)
}

/**
 * strips ANSI codes from a string. From https://github.com/xpl/ansicolor/blob/master/ansicolor.js
 * @param {string} s a string containing ANSI escape codes.
 * @return {string} clean string.
 */
export function strip(s: string) {
  return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, '') // hope V8 caches the regexp
}
