export function flatDeep(arr: any[]): any[] {
  return arr && arr.length ? arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val)), []) : []
}

export function flat<T>(arr: T[][]): T[] {
  return arr && arr.length ? arr.reduce((a, b) => a.concat(b)) : []
}

export function flatReadOnly<T>(arr: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<T> {
  return arr && arr.length ? arr.reduce((a, b) => a.concat(b)) : []
}

export function flatInstallArrayPrototype() {
  if (typeof Array.prototype.flat === 'undefined') {
    Array.prototype.flat = function() {
      //@ts-ignore
      return flat(this)
    }
  }
}
