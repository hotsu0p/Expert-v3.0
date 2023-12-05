export declare function sleep(ms: number): Promise<void>;
export declare const wait: typeof sleep;
export declare function withTime<T>(label: string, fn: () => T): T;
/** blocks the thread for given ms. For testing purposes. */
export declare function blockFor(ms?: number): void;
