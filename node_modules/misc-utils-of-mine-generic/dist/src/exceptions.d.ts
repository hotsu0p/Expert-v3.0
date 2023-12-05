import { NotFalsy } from './type';
export declare function checkThrow<T>(r?: T, msg?: string): T;
export declare function checkTruthy<T>(r?: T, msg?: string): r is NotFalsy<T>;
export declare function tryTo<R = any, D = undefined>(f: (...args: any[]) => R, def?: D): R | D | undefined;
