export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const wait = sleep

export function withTime<T>(label: string, fn: () => T): T {
  console.time(label)
  const r = fn()
  console.timeEnd(label)
  return r
}

/** blocks the thread for given ms. For testing purposes. */
export function blockFor(ms = 1000) {
  let t0 = Date.now()
  while (Date.now() - t0 < ms) {
  }
}
