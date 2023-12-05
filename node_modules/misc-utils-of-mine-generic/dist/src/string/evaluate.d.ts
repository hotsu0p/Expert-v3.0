export declare function evaluate<T = any>(s: string, defaultValue?: undefined): T | undefined;
/**
 * Transform a string like `foo: 2, bar: hello world` to an object like `{foo: '2', bar: 'hello world'}`
 */
export declare function stringToObject(s?: string, propSep?: string, nameValueSep?: string): any;
