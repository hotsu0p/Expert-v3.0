/**
 * wrap string with given quote character and escape it in the string. Useful to quote strings to be printed as json, sql values, etc.
 */
export declare function quote(s: string, quote?: string): string;
export declare function unquote(s: string): string;
export declare function repeat(n: number, s: string): string;
export declare function indent(i?: number, tabSize?: number): string;
export declare function wordWrap(s: string, w: number, newLine?: string): string;
/**
 * strips ANSI codes from a string. From https://github.com/xpl/ansicolor/blob/master/ansicolor.js
 * @param {string} s a string containing ANSI escape codes.
 * @return {string} clean string.
 */
export declare function strip(s: string): string;
