import { sleep } from '.'

// tools for wait  (pooling) until a element has some state - mostly for testing...

interface WaitForPredicateOptions {
  /**
   * Predicate function call interval.
   */
  interval?: number
  /**
   * Timeout. If more time than this passes from [[waitForPredicate]] call, it will throw an error.
   */
  timeout?: number
  timeoutError?: string
}

const defaultOptions: WaitForPredicateOptions = { interval: 200, timeout: 3000 }

/**
 * Returns a promise that is resolved when given predicate function returns truthy or
 * timeout (see options). The function is called in given option's [[interval]] times.
 */
export async function waitForPredicate<T = boolean>(
  p: (...args: any[]) => T | undefined,
  options: WaitForPredicateOptions | string = { interval: 200, timeout: 3000 }
): Promise<T> {
  const o =
    typeof options == 'string' ? { ...defaultOptions, timeoutError: options } : (options as WaitForPredicateOptions)
  const t = setTimeout(() => {
    const msg = o.timeoutError || p.toString().substring(0, Math.min(p.toString().length, 100))
    throw new Error(msg)
  }, o.timeout || 3000)
  let r: T | undefined
  while (!(r = p())) {
    await sleep(o.interval || 200)
  }
  t && clearTimeout(t)
  return r
}
