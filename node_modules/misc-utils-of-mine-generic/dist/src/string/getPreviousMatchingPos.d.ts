/**
 * Get index of the previous match of given predicate or substring, before given pos, on given text. For the next matching position you can use `String.prototype.findIndexOf` function.
 */
export declare function getPreviousMatchingPos(text: string, pos: number, predicate: string | ((char: string) => boolean)): number;
/**
 * Gets index of n-th match of given substring on given string.
 */
export declare function getPosition(string: string, subString: string, n: number): number;
