interface WaitForPredicateOptions {
    /**
     * Predicate function call interval.
     */
    interval?: number;
    /**
     * Timeout. If more time than this passes from [[waitForPredicate]] call, it will throw an error.
     */
    timeout?: number;
    timeoutError?: string;
}
/**
 * Returns a promise that is resolved when given predicate function returns truthy or
 * timeout (see options). The function is called in given option's [[interval]] times.
 */
export declare function waitForPredicate<T = boolean>(p: (...args: any[]) => T | undefined, options?: WaitForPredicateOptions | string): Promise<T>;
export {};
