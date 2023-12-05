
export function array<T = number>(n: number, sample?: T): T[] {
  const a: (T | number)[] = []
  for (let i = 0; i < n; i++) {
    a.push(typeof sample === 'undefined' ? i : sample)
  }
  return a as T[]
}

export function asArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function seq(start: number = 0, step: number = 1, max: number = 0): number[] {
  const result = []
  for (let i = start; i < max; i += step) {
    result.push(i)
  }
  return result
}

export function randomItems<T>(a: T[], amount: number): T[] {
  if (amount <= 0) {
    return []
  }
  amount = Math.min(a.length, amount)
  const indexes = shuffle(array(a.length))
  const result: T[] = []
  for (let i = 0; i < amount; i++) {
    result.push(a[indexes[i]])
  }
  return result
  // return randomIntsBetween(amount, 0, a.length - 1).map(i => a[i]).filter(notUndefined)
}

export function shuffle<T>(a: T[]): T[] {
  return a.sort(() => Math.random() - 0.5)
}

export function arrayRangePartition<T>(input: T[], length: number, fillRestWith?: T) {
  const digits: T[][] = []
  let acc: T[] = []
  input.map((n, i) => {
    acc.push(n)
    if (acc.length === length) {
      digits.push(acc)
      acc = []
    }
  })
  if (acc.length) {
    if (typeof fillRestWith !== 'undefined' && acc.length < length) {
      acc = [...acc, ...array(length - acc.length).map(i => fillRestWith)]
    }
    digits.push(acc)
  }
  return digits
}

export function fill<T>(a: T[], length: number, fillWith: T, before = false) {
  if (a.length < length) {
    a = before ? [...array(length - a.length).map(i => fillWith), ...a] : [...a, ...array(length - a.length).map(i => fillWith)]
  }
  return a
}