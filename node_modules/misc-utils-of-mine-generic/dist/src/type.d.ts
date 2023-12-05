export declare function getType(type: any): string;
export declare function isObject(obj: any): boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare function isString(a: any): a is string;
export declare function isBoolean(obj: any): boolean;
/**
 * Get type of variable
 * @see http://jsperf.com/typeofvar
 */
export declare function typeOf(input: any): string;
export declare type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>;
export declare type PropertyOptional<O, K extends keyof O> = RemoveProperties<O, K> & ({
    [a in K]?: O[K];
});
/** Useful TODO reminder when you are porting typings of a JavaScript library */
export declare type TODO = any;
/** Removes undefined from type */
export declare type NotUndefined<T> = Exclude<T, undefined>;
export declare type EmptyObject = {};
export declare type Map<K extends string = string, V = any> = {
    [k in K]: V;
};
declare type falsy = undefined | null | false | '' | 0;
/**
 * Without arguments it returns the union of all falsy values. With arguments it returns given type excluding falsy arguments.  Example `Falsy<number|boolean|null> ` will be `false|null`
 */
export declare type Falsy<T = never> = T extends never ? (never extends T ? falsy : Extract<T, falsy>) : Extract<T, falsy>;
/** Removes undefined from type.  Example `Falsy<number|boolean>` will be `number|true` */
export declare type NotFalsy<T> = Exclude<T, falsy>;
/** c:ObjectStringKeyUnion<{a:1,b:'s'}> === 'a'|'b' */
export declare type ObjectStringKeyUnion<T extends any> = Extract<keyof T, string>;
export declare type Fn<args extends any[] = any[], returnValue extends any = any> = (...args: args) => returnValue;
/** UnionToIntersection<1|2|3>  will be 1 & 2 & 3 */
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export {};
