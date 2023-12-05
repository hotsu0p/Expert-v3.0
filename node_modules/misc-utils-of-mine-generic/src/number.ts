import { array } from './array'

let _unique: number = 0
export function unique(prefix: string = '_'): string {
  return prefix + _unique++
}

let _counter = 0
export function counter() {
  return _counter++
}

export function randomIntBetween(a: number, b: number) {
  return Math.floor(Math.random() * b) + a
}

export function randomIntsBetween(l: number, min: number, max: number) {
  return array(l).map(n => randomIntBetween(min, max))
}

export const ints = randomIntsBetween

export const int = randomIntBetween

export function randomFloatBetween(a: number, b: number) {
  return Math.random() * b + a
}

export function randomFloatsBetween(l: number, min: number, max: number) {
  return array(l).map(n => randomFloatBetween(min, max))
}
export const floats = randomFloatsBetween

export const float = randomFloatBetween

/**
 * Makes sure n is between min and max inclusive.
 */
export function between(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

/**
 * Makes sure n is between min and max inclusive and is natural.
 */
export function intBetween(n: number, min: number, max: number) {
  return Math.trunc(Math.max(min, Math.min(n, max)))
}

export const clamp = intBetween

export function randomItem<T>(a: T[]): T {
  return a[randomIntBetween(0, a.length - 1)]
}

export function isPrime(num: number) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false
  return num !== 1
}
