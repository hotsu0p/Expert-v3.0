export function evaluate<T = any>(s: string, defaultValue = undefined): T | undefined {
  try {
    return eval(`(${s})`) as T
  }
  catch (error) {
    return defaultValue
  }
}
/**
 * Transform a string like `foo: 2, bar: hello world` to an object like `{foo: '2', bar: 'hello world'}`
 */
export function stringToObject(s: string = '', propSep = ',', nameValueSep = ':') {
  const a = s.split(propSep).map(s => s.trim())
  const o: any = {}
  a.forEach(f => {
    const b = f.split(nameValueSep).map(a => a.trim())
    if (b.length !== 2) {
      return
    }
    o[b[0]] = b[1]
  })
  return o
}
