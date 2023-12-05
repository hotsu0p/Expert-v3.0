/**
 * Execute given functions returning promises serially. Returns a promise that resolves when all finish with they results as array.
 */
export declare function serial<T = any>(p: (() => Promise<T>)[]): Promise<T[]>;
/** iterates serially */
export declare function asyncForEach(array: any[], callback: any): Promise<void>;
/** applies a map() serially */
export declare function asyncMap<T, R = any>(array: T[], callback: (t: T, i: number, a: T[]) => Promise<R>): Promise<R[]>;
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
export declare class Deferred<R, J = any> {
    resolve: (r: R) => void;
    reject: (r: J) => void;
    private promise;
    status: 'resolved' | 'pending' | 'rejected';
    constructor(callback?: (this: Deferred<R, J>, resolve: (r: R) => void, reject?: (r: J) => void) => void);
    then(resolve: (r: R) => void): Promise<void>;
    catch(r: (reject: J) => void): Promise<void | R>;
}
