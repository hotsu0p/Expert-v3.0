import { NotFalsy } from './type'

export function checkThrow<T>(r?: T, msg = 'Throwing on undefined value'): T {
  if (!r) {
    throw new Error(msg)
  }
  return r
}

export function checkTruthy<T>(r?: T, msg = 'Throwing on undefined value'): r is NotFalsy<T> {
  if (!r) {
    throw new Error(msg)
  }
  return true
}
// let _f: Date|undefined
// if( checkTruthy(_f)){
// var f = _f
// }

export function tryTo<R = any, D = undefined>(f: (...args: any[]) => R, def?: D): R | D | undefined {
  try {
    return f()
  } catch (error) {
    return def
  }
}
