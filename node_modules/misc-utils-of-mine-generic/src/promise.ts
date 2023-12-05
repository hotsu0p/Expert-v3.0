
/**
 * Execute given functions returning promises serially. Returns a promise that resolves when all finish with they results as array.
 */
export function serial<T = any>(p: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise(resolve => {
    p.reduce((promiseChain: any, currentTask: () => Promise<T>) => {
      return promiseChain.then((chainResults: T[]) =>
        currentTask().then(currentResult => [...chainResults, currentResult])
      )
    }, Promise.resolve([])).then((arrayOfResults: T[]) => {
      resolve(arrayOfResults)
    })
  })
}

/** iterates serially */
export async function asyncForEach(array: any[], callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/** applies a map() serially */
export async function asyncMap<T, R = any>(array: T[], callback: (t: T, i: number, a: T[]) => Promise<R>) {
  const result: R[] = [];
  await asyncForEach(array, async (item: any, i: number, a: any[]) => {
    result.push(await callback(item, i, a));
  });
  return result;
}

/**
 * Promise like object that allows to resolve it promise from outside code. Example: 
 * 
```
class Api {
  fooReady = new Deferred<Data>()
  private knower() {
    inOtherMoment(data=>{
      this.fooReady.resolve(data)
    })
  }
}
```
 */
export class Deferred<R, J = any> {
  resolve: (r: R) => void
  reject: (r: J) => void
  private promise: Promise<R>
  public status: 'resolved' | 'pending' | 'rejected';
  constructor(callback?: (this: Deferred<R, J>, resolve: (r: R) => void, reject?: (r: J) => void) => void) {
    let instance = this
    this.resolve = null as any
    this.reject = null as any
    this.status = 'pending'
    this.promise = new Promise(function(resolve, reject) {
      instance.resolve = function() { this.status = 'resolved'; resolve.apply(this, arguments as any) }
      instance.reject = function() { this.status = 'rejected'; reject.apply(this, arguments as any) }
    })
    if (typeof callback === 'function') {
      callback.call(this, this.resolve, this.reject)
    }
  }
  then(resolve: (r: R) => void) {
    return this.promise.then(resolve)
  }
  catch(r: (reject: J) => void) {
    return this.promise.catch(r)
  }
}
