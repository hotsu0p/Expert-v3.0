import { notUndefined } from './array'
import { EmptyObject, isArray, isObject, ObjectStringKeyUnion } from './type'

/**
 * Same as `Object.keys()` but with types.
 */
export function objectKeys<Field extends EmptyObject = EmptyObject>(o: Field): ObjectStringKeyUnion<Field>[] {
  return Object.keys(o) as ObjectStringKeyUnion<Field>[]
}

/**
 * Returns a new object with the same keys of given one, and values mapped with given function.
 */
export function objectMapValues<O extends { [k in keyof O]: O[keyof O] } = any, T = any>(
  o: O,
  p: (k: keyof O, v: O[keyof O]) => T
): { [k in keyof O]: T } {
  var r: { [k in keyof O]: T } = {} as any
  objectKeys(o).forEach(k => {
    r[k] = p(k, o[k])
  })
  return r
}

export const objectMap = objectMapValues

export function objectToArray<O extends { [k in keyof O]: O[keyof O] } = any>(o: O): { key: keyof O, value: O[keyof O] }[] {
  return objectKeys(o).map(key => ({ key, value: o[key] }))
}

export function objectFilter<O extends { [k in keyof O]: O[keyof O] } = any>(
  o: O,
  p: (k: keyof O, v: O[keyof O]) => boolean
): Partial<O> {
  var r: Partial<O> = {}
  objectKeys(o)
    .filter((k, v) => p(k, o[k]))
    .forEach(k => {
      r[k] = o[k]
    })
  return r
}

export function objectOrderKeysAlphabetically<T = any>(o: T) {
  const r = {} as T
  Object.keys(o).sort().forEach(k => {
    //@ts-ignore
    r[k] = o[k]
  })
  return r
}

/**
 * Builds an object using keys in [[a]] and values returning from [[fn]] as long as they are not undefined.
 */
export function arrayToObject<T = any>(a: string[], fn: (a: string) => T | undefined) {
  const o: { [s: string]: T | undefined } = {}
  a.filter(notUndefined).forEach(k => {
    o[k] = fn(k)
  })
  return o
}

/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will
 * return `object['foo']['bar']`
 */
export function getObjectProperty<T>(
  object: any,
  path: string | (string | number)[],
  defaultValue: T | undefined = undefined
): T | undefined {
  if (!path) {
    return object
  } else if (object) {
    var tokens = typeof path === 'string' ? path.split('.') : path,
      prev = object,
      n = 0
    while (typeof prev !== 'undefined' && n < tokens.length) {
      prev = prev[tokens[n++]]
    }
    if (typeof prev !== 'undefined') {
      return prev
    }
  }
  return defaultValue
}

/**
 * sets a nested property on given path. For example path could be 'foo.bar' and it will set `object.foo.bar = value`.
 * If the path given as array contains numbers, then or those items arrays will be created instead of objects. For example:
 *
 * `setObjectProperty({}, ['foo', 0, 1, 'bar'], 'hello)`
 */
export function setObjectProperty(object: any, path: string | (string | number)[], value: any): any {
  if (!path || !object) {
    throw new Error('Insufficient arguments')
  }
  var tokens = typeof path === 'string' ? path.split('.') : path,
    prev = object
  if (tokens.length === 0) {
    Object.assign(object, value)
    return object
  }
  for (var i = 0; i < tokens.length - 1; ++i) {
    var currentToken = tokens[i]
    if (typeof prev[currentToken] === 'undefined') {
      prev[currentToken] = typeof tokens[i + 1] === 'number' ? [] : {}
    } else {
      if (typeof tokens[i + 1] === 'number' && !Array.isArray(prev[currentToken])) {
        throw new Error(
          `Detected number path item on non array value. Path: ${path}, item: ${tokens[i + 1]}, Value: ${
          prev[currentToken]
          }`
        )
      }
    }
    prev = prev[currentToken]
  }
  if (tokens.length) {
    prev[tokens[tokens.length - 1]] = value
  }
  return object
}

export function getObjectPropertyPaths(
  object: any,
  options: { ignoreArrayElements?: boolean; leafsOnly?: boolean } = { ignoreArrayElements: true, leafsOnly: false }
) {
  function visit(object: any, p: (number | string)[][] = [], p2: (number | string)[] = []) {
    const objectIsArray = isArray(object)
    if (options.ignoreArrayElements && objectIsArray) {
      return
    }
    for (var i in object) {
      var v = object[i]
      const objectName = objectIsArray ? parseInt(i) : i + ''
      const p3: (number | string)[] = [...p2, objectName]
      if (isObject(v) || isArray(v)) {
        visit(v, p, p3)
      }
      p.push(p3)
      p.push(p2)
    }
  }
  const p: (number | string)[][] = []
  const p2: (number | string)[] = []
  visit(object, p, p2)
  const result = p
    .filter((p, i, a) => a.length && a.findIndex(o => JSON.stringify(o) === JSON.stringify(p)) === i)
    .sort((a, b) => a.length - b.length)
    .filter(a => a.length > 0)
  if (options.leafsOnly) {
    return result.filter(
      p =>
        !result.find(
          p2 => p2 !== p && p2.length > p.length && JSON.stringify(p) === JSON.stringify(p2.slice(0, p.length))
        )
    )
  } else {
    return result
  }
}
