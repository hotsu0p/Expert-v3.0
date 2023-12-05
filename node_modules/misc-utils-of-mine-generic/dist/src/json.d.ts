/** try to parse given json string. return undefined in case there is an error. */
export declare function parseJSON<K = any>(s: string, defaultValue?: K | undefined): K | undefined;
export declare function stringifyJSON<K = any>(s: K, defaultValue?: string | undefined): string | undefined;
export declare function cloneJSON<T>(a: T): T;
export declare function visitJson(o: JSONValue, v: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): boolean;
export declare function findJson(o: JSONValue, p: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): {
    value: JSONValue;
    key: string | number;
} | undefined;
export declare type JSONPrimitive = string | number | boolean | null;
/** makes sure an object is JSON compatible so we can safely serialize with JSON.stringify */
export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export declare type JSONObject = {
    [member: string]: JSONValue;
};
export interface JSONArray extends Array<JSONValue> {
}
export declare function isJSONObject(o: any): o is JSONObject;
