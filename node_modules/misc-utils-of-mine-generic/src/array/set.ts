import { dedup } from './filter'

export function unionEquals<T>(a: T[], b: T[], predicate: (a: T, b: T) => boolean = (a, b) => a === b, output?: T[]): T[] {
  var r = dedup([...a, ...b], predicate)
  output && output.push(...dedup([...r, ...output], predicate))
  return r
}

export const arrayUnion = unionEquals

export function arrayInterception<A = any>(a: A[], b: A[], predicate: (a: A, b: A) => boolean = (a, b) => a === b, output?: A[]): A[] {
  var r = a.filter(a => b.find(b => predicate(a, b)))
  r = dedup(r, predicate)
  output && output.push(...dedup([...r, ...output], predicate))
  return r
}

export function arrayDifference<A = any>(a: A[], b: A[], predicate: (a: A, b: A) => boolean = (a, b) => a === b, output?: A[]): A[] {
  var r = a.filter(a => !b.find(b => predicate(a, b))).concat(b.filter(b => !a.find(a => predicate(b, a))))
  r = dedup(r, predicate)
  output && output.push(...dedup([...r, ...output], predicate))
  return r
}
