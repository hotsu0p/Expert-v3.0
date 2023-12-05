export declare function array<T = number>(n: number, sample?: T): T[];
export declare function asArray<T>(value: T | T[]): T[];
export declare function seq(start?: number, step?: number, max?: number): number[];
export declare function randomItems<T>(a: T[], amount: number): T[];
export declare function shuffle<T>(a: T[]): T[];
export declare function arrayRangePartition<T>(input: T[], length: number, fillRestWith?: T): T[][];
export declare function fill<T>(a: T[], length: number, fillWith: T, before?: boolean): T[];
