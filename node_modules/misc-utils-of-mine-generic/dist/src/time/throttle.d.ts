export declare function throttle<F extends (...args: any[]) => any>(func: F, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): (this: any) => any;
