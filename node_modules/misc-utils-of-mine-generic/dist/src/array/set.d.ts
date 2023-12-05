export declare function unionEquals<T>(a: T[], b: T[], predicate?: (a: T, b: T) => boolean, output?: T[]): T[];
export declare const arrayUnion: typeof unionEquals;
export declare function arrayInterception<A = any>(a: A[], b: A[], predicate?: (a: A, b: A) => boolean, output?: A[]): A[];
export declare function arrayDifference<A = any>(a: A[], b: A[], predicate?: (a: A, b: A) => boolean, output?: A[]): A[];
