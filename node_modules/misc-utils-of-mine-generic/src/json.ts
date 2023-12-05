import { objectToArray } from './object'
import { isArray } from './type'

/** try to parse given json string. return undefined in case there is an error. */
export function parseJSON<K = any>(s: string, defaultValue: K | undefined = undefined): K | undefined {
  try {
    return JSON.parse(s)
  } catch (error) {
    return defaultValue
  }
}

export function stringifyJSON<K = any>(s: K, defaultValue: string | undefined = undefined): string | undefined {
  try {
    return JSON.stringify(s)
  } catch (error) {
    return defaultValue
  }
}

export function cloneJSON<T>(a: T): T {
  return JSON.parse(JSON.stringify(a))
}

export function visitJson(o: JSONValue, v: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): boolean {
  if (isArray(o) && o) {
    return v(o, _name) || o.some((va, i) => visitJson(va, v, i))
  }
  else if (typeof o === 'object' && o) {
    return v(o, _name) || objectToArray(o).some(o => visitJson(o.value as JSONValue, v, o.key))
  }
  else {
    return v(o, _name)
  }
}

export function findJson(o: JSONValue, p: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): { value: JSONValue, key: string | number } | undefined {
  let r: { value: JSONValue, key: string | number } | undefined = undefined
  visitJson(o, (value, key) => {
    if (p(value, key)) {
      r = { value, key: key! }
      return true
    }
    return false
  })
  return r
}

export type JSONPrimitive = string | number | boolean | null

/** makes sure an object is JSON compatible so we can safely serialize with JSON.stringify */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type JSONObject = {
  [member: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {

}

export function isJSONObject(o: any): o is JSONObject {
  return typeof o === 'object' && !Array.isArray(o)
}
