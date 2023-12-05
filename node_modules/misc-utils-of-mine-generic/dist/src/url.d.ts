export declare function getFileNameFromUrl(url: string): string;
export declare function getParametersFromUrl(url: string, options?: {
    parseNumber?: boolean;
    parseBoolean?: boolean;
}): {
    [s: string]: string;
};
/**
 * Returns true iff given url starts with a protocol ("http://", "https://", etc).
 * Notice that this is not strictly the absolute url definition
 */
export declare function isAbsoluteUrl(url: string): boolean;
/**
 * Parse url, emulates window.location format
 */
export declare function parseUrl(url: string, options?: {
    parseParams?: boolean;
}): {
    protocol: string;
    domain: string;
    pathname: string;
    search: string;
    hash: string;
    params: {
        [s: string]: string;
    } | undefined;
} | null;
