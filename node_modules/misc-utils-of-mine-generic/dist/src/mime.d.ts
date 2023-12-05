/**
 * Returns mimetype associated to given extension or undefined if none is found. This only considers nginx
 * mime type list form https://github.com/jshttp/mime-db
 */
export declare function getMimeTypeForExtension(extension: string): string | undefined;
/**
 * Returns known extensions for given MimeType or undefined if none is found. This only considers nginx mime
 * type list form https://github.com/jshttp/mime-db
 */
export declare function getExtensionsForMimeType(mimeType: string): "" | string[] | undefined;
