var toStr = Object.prototype.toString

export function getType(type: any) {
  return toStr.call(type)
}

export function isObject(obj: any) {
  return typeof obj === 'object' && getType(obj) === '[object Object]'
}

export const isArray =
  Array.isArray ||
  function(obj: any) {
    return toStr.call(obj) === '[object Array]'
  }

export function isString(a: any): a is string {
  return typeof a === 'string'
}

export function isBoolean(obj: any) {
  return typeof obj === 'boolean' || getType(obj) === '[object Boolean]'
}

/**
 * Get type of variable
 * @see http://jsperf.com/typeofvar
 */
export function typeOf(input: any) {
  return {}.toString
    .call(input)
    .slice(8, -1)
    .toLowerCase()
}

export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

export type PropertyOptional<O, K extends keyof O> = RemoveProperties<O, K> & ({ [a in K]?: O[K] })

/** Useful TODO reminder when you are porting typings of a JavaScript library */
export type TODO = any

/** Removes undefined from type */
export type NotUndefined<T> = Exclude<T, undefined>


export declare type EmptyObject = {}

export declare type Map<K extends string = string, V = any> = { [k in K]: V }

type falsy = undefined | null | false | '' | 0

/**
 * Without arguments it returns the union of all falsy values. With arguments it returns given type excluding falsy arguments.  Example `Falsy<number|boolean|null> ` will be `false|null`
 */
export type Falsy<T = never> = T extends never ? (never extends T ? falsy : Extract<T, falsy>) : Extract<T, falsy>
// let c: Falsy<number|boolean|null>

/** Removes undefined from type.  Example `Falsy<number|boolean>` will be `number|true` */
export type NotFalsy<T> = Exclude<T, falsy>
// let c: NotFalsy<number|boolean>

/** c:ObjectStringKeyUnion<{a:1,b:'s'}> === 'a'|'b' */
export type ObjectStringKeyUnion<T extends any> = Extract<keyof T, string>

export type Fn<args extends any[] = any[], returnValue extends any = any> = (...args: args) => returnValue

/** UnionToIntersection<1|2|3>  will be 1 & 2 & 3 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
