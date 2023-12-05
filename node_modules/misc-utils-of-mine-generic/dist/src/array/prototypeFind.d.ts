export declare function arrayPrototypeFind<T, E = any>(this: E, a: T[], predicate: FindPredicate<T, typeof thisArg>, thisArg?: E): T | undefined;
export declare type FindPredicate<T, E = any> = (this: E, value: T, index: number, obj: T[]) => boolean;
export declare function installArrayPrototypeFind(force?: boolean): void;
