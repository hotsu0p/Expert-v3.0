import { NotFalsy, NotUndefined } from '../type';
/**
 * Remove duplicate items according to given predicate.
 */
export declare function dedup<T>(a: T[], predicate: (a: T, b: T) => boolean): T[];
/**
 * Useful for filtering out undefined values without casting. like `array.filter(notUndefined)`.
 */
export declare function notUndefined<T>(n: T): n is NotUndefined<T>;
/**
 * Useful for filtering out falsy values without casting. like `array.filter(notFalsy)`.
 */
export declare function notFalsy<T>(n: T): n is NotFalsy<T>;
/**
 * Use it to remove duplicates in array's filter expressions like `array.filter(notSame)`.
 */
export declare function notSame<T>(t: T, i: number, a: T[]): boolean;
/**
 * Use it remove duplicates and falsy values in filter() expressions like `array.filter(notSameNotFalsy)`.
 */
export declare function notSameNotFalsy<T>(t: T, i: number, a: T[]): t is NotFalsy<T>;
/**
 * Returns true if any item in given array is undefined.
 */
export declare function anyUndefined(...a: any[]): boolean;
