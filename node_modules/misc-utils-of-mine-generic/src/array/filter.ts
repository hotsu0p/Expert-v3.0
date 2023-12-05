import { NotFalsy, NotUndefined } from '../type'

/**
 * Remove duplicate items according to given predicate.
 */
export function dedup<T>(a: T[], predicate: (a: T, b: T) => boolean): T[] {
  return a.filter((n, i, a) => i === a.findIndex(x => predicate(n, x)))
}

/** 
 * Useful for filtering out undefined values without casting. like `array.filter(notUndefined)`.
 */
export function notUndefined<T>(n: T): n is NotUndefined<T> {
  return n !== undefined
}

/** 
 * Useful for filtering out falsy values without casting. like `array.filter(notFalsy)`.
 */
export function notFalsy<T>(n: T): n is NotFalsy<T> {
  return !!n
}

/**
 * Use it to remove duplicates in array's filter expressions like `array.filter(notSame)`.
 */
export function notSame<T>(t: T, i: number, a: T[]) {
  return a.indexOf(t) === i
}

/**
 * Use it remove duplicates and falsy values in filter() expressions like `array.filter(notSameNotFalsy)`.
 */
export function notSameNotFalsy<T>(t: T, i: number, a: T[]): t is NotFalsy<T> {
  return a.indexOf(t) === i
}

/**
 * Returns true if any item in given array is undefined.
 */
export function anyUndefined(...a: any[]) {
  return !!a.find(a => typeof a === 'undefined')
}
