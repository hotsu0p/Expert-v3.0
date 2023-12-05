declare type TextCompareMode = 'contains' | 'contained' | 'equals' | 'startsWith' | 'endsWith';
export declare type Multiplicity = 'anyOf' | 'allOf';
interface BaseCompareOptions {
    negate?: boolean;
}
export interface CompareTextOptions extends BaseCompareOptions {
    caseInsensitive?: boolean;
    asCode?: boolean;
    verb?: TextCompareMode;
}
interface CompareWithMultiplicityOptionsConcrete {
    multiplicity?: Multiplicity;
}
export interface CompareOptions extends CompareWithMultiplicityOptionsConcrete, BaseCompareOptions {
}
export interface CompareTextsOptions extends CompareTextOptions, CompareWithMultiplicityOptionsConcrete {
}
export declare function compareTexts(actual: string | string[], expected: string | string[], options: CompareTextsOptions): boolean;
export declare function compareText(actual: string, expected: string, options: CompareTextOptions): boolean;
export {};
