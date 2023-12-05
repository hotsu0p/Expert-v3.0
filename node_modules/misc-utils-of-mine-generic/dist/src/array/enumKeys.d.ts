/**
 * List given enum keys as array. Must be used on enums with declared values (enum E {a='a', b='b'}, if not
 * values could be also returned . For enums without declared values, use enumNoValueKeys
 */
export declare function enumKeys(anEnum: any): string[];
/**
 * List given enum keys as array. Differently to [[enumKeys]], is should be used only on enums that doesn't
 * have assigned values or other wise on those which values are identical to the keys or not strings. If not,
 * they will be returned also!
 */
export declare function enumNoValueKeys(anEnum: any): string[];
/**
 * Returns the key of the first property with given value of given enum
 */
export declare function getEnumKey(anEnum: any, value: any): string;
/**
 * Return given enum as a {name, value} array.
 */
export declare function getEnumKeyAndValue(e: any): {
    key: string;
    value: any;
}[];
/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
export declare function enumValueFromString<T>(key: string, anEnum: any): T | undefined;
/** Optimal array to dictionary de serialization because `array.reduce` and `Object.assign` are too slow for large collections. */
export declare function toObject<T = any>(array: T[], groupByKey: string): {
    [s: string]: T;
};
/**
 * From an enum like :
 * ```
 enum Providers {
    apple = 1,
    google = 2,
    facebook = 3,
  }
 * ```
  builds an object like this:
 * ```
  {
    apple: 1,
    google: 2,
    facebook: 3
  }
 * ```
  useful for in-code documentation/descriptions/validations
 */
export declare function buildEnumMap(anEnum: any): any;
