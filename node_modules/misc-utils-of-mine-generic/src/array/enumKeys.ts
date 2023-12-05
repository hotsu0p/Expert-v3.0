/**
 * List given enum keys as array. Must be used on enums with declared values (enum E {a='a', b='b'}, if not
 * values could be also returned . For enums without declared values, use enumNoValueKeys
 */
export function enumKeys(anEnum: any): string[] {
  const a = []
  for (let i in anEnum) {
    a.push(i)
  }
  return a
}

/**
 * List given enum keys as array. Differently to [[enumKeys]], is should be used only on enums that doesn't
 * have assigned values or other wise on those which values are identical to the keys or not strings. If not,
 * they will be returned also!
 */
export function enumNoValueKeys(anEnum: any): string[] {
  return Object.keys(anEnum)
    .map(i => anEnum[i as any])
    .filter((s, i, a) => typeof s === 'string' && a.indexOf(s) === i)
}

/**
 * Returns the key of the first property with given value of given enum
 */
export function getEnumKey(anEnum: any, value: any): string {
  for (const key in anEnum) {
    if (value === anEnum[key]) {
      return key
    }
  }
  return ''
}

/**
 * Return given enum as a {name, value} array.
 */
export function getEnumKeyAndValue(e: any) {
  const a = []
  for (const key in e) {
    a.push({ key, value: e[key] })
  }
  return a
}

/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
export function enumValueFromString<T>(key: string, anEnum: any): T | undefined {
  return anEnum[key]
}

/** Optimal array to dictionary de serialization because `array.reduce` and `Object.assign` are too slow for large collections. */
export function toObject<T = any>(array: T[], groupByKey: string) {
  const obj: { [s: string]: T } = {};
  array.forEach(item => {
    //@ts-ignore
    obj[item[groupByKey]] = item;
  })
  return obj;
}

/**
 * From an enum like : 
 * ```
 enum Providers {
    apple = 1,
    google = 2,
    facebook = 3,
  }
 * ```
  builds an object like this:
 * ```
  {
    apple: 1,
    google: 2,
    facebook: 3
  }
 * ```
  useful for in-code documentation/descriptions/validations
 */
export function buildEnumMap(anEnum: any) {
  const r = {} as any
  getEnumKeyAndValue(anEnum).forEach(({ key, value }) => {
    if (isNaN(parseInt(key))) {
      r[key.toLowerCase()] = value
    } else {
      r[parseInt(key)] = parseInt(key)
    }
  })
  return r
}