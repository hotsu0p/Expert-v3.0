import { EmptyObject, ObjectStringKeyUnion } from './type';
/**
 * Same as `Object.keys()` but with types.
 */
export declare function objectKeys<Field extends EmptyObject = EmptyObject>(o: Field): ObjectStringKeyUnion<Field>[];
/**
 * Returns a new object with the same keys of given one, and values mapped with given function.
 */
export declare function objectMapValues<O extends {
    [k in keyof O]: O[keyof O];
} = any, T = any>(o: O, p: (k: keyof O, v: O[keyof O]) => T): {
    [k in keyof O]: T;
};
export declare const objectMap: typeof objectMapValues;
export declare function objectToArray<O extends {
    [k in keyof O]: O[keyof O];
} = any>(o: O): {
    key: keyof O;
    value: O[keyof O];
}[];
export declare function objectFilter<O extends {
    [k in keyof O]: O[keyof O];
} = any>(o: O, p: (k: keyof O, v: O[keyof O]) => boolean): Partial<O>;
export declare function objectOrderKeysAlphabetically<T = any>(o: T): T;
/**
 * Builds an object using keys in [[a]] and values returning from [[fn]] as long as they are not undefined.
 */
export declare function arrayToObject<T = any>(a: string[], fn: (a: string) => T | undefined): {
    [s: string]: T | undefined;
};
/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will
 * return `object['foo']['bar']`
 */
export declare function getObjectProperty<T>(object: any, path: string | (string | number)[], defaultValue?: T | undefined): T | undefined;
/**
 * sets a nested property on given path. For example path could be 'foo.bar' and it will set `object.foo.bar = value`.
 * If the path given as array contains numbers, then or those items arrays will be created instead of objects. For example:
 *
 * `setObjectProperty({}, ['foo', 0, 1, 'bar'], 'hello)`
 */
export declare function setObjectProperty(object: any, path: string | (string | number)[], value: any): any;
export declare function getObjectPropertyPaths(object: any, options?: {
    ignoreArrayElements?: boolean;
    leafsOnly?: boolean;
}): (string | number)[][];
