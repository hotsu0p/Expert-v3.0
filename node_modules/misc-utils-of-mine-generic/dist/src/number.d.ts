export declare function unique(prefix?: string): string;
export declare function counter(): number;
export declare function randomIntBetween(a: number, b: number): number;
export declare function randomIntsBetween(l: number, min: number, max: number): number[];
export declare const ints: typeof randomIntsBetween;
export declare const int: typeof randomIntBetween;
export declare function randomFloatBetween(a: number, b: number): number;
export declare function randomFloatsBetween(l: number, min: number, max: number): number[];
export declare const floats: typeof randomFloatsBetween;
export declare const float: typeof randomFloatBetween;
/**
 * Makes sure n is between min and max inclusive.
 */
export declare function between(n: number, min: number, max: number): number;
/**
 * Makes sure n is between min and max inclusive and is natural.
 */
export declare function intBetween(n: number, min: number, max: number): number;
export declare const clamp: typeof intBetween;
export declare function randomItem<T>(a: T[]): T;
export declare function isPrime(num: number): boolean;
