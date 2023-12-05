/**
 * Check whether an object is a generator.
 */
export function isGenerator(obj: any): obj is Generator {
  return obj && typeof obj.next === 'function' && typeof obj.throw === 'function'
}

/**
 * Check whether a function is generator.
 */
export function isGeneratorFunction(fn: any): fn is GeneratorFunction {
  return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction'
}

export function isClassConstructorFunction(a: any) {
  return a && a.prototype && a.prototype.constructor && (a.prototype.constructor.toString().startsWith('class'))
}

