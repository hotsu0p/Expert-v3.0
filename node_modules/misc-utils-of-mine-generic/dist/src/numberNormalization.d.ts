interface Normalizer {
    encode(n: number, inputSize?: number): number[];
    decode(input: number[]): number;
}
export declare const binaryStraightNormalizer: Normalizer;
export declare const binaryDigitNormalizer: Normalizer;
export declare const decimalDigitNormalizer: Normalizer;
export declare function dec2bin(number: number, arrayLength?: number): number[];
export declare function bin2dec(number: any[]): number;
export {};
