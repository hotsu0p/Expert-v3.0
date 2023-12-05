export declare function bytesToKiloBytes(fileSizeInBytes: number): number;
/**
 * Gets given path extension or empty string if any
 */
export declare function withoutExtension(f: string): string;
/**
 * Similar to node's' path.basename, returns the file name without folder and with the extension.
 * Pass [[withoutExtension]] to remove it.
 */
export declare function basename(f: string, removeExtension?: boolean): string;
/**
 * Gets given file path extension.
 */
export declare function getFileExtension(s: string): string;
/**
 * Gets the directory path of given path converting `\\` path separator to `/`.
 */
export declare function dirname(path: string): string;
/**
 * Given a source directory and a target file name, return the relative file path from source to target, converting `\\` path separator to `/`.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path from `source` to `target` (e.g. `"../../style.css"`), converting `\\` path separator to `/`.
 */
export declare function getRelativePath(source: string, target: string): string;
/**
 * Similar to node's' `path.join()`. It will return the path resulting of join given path parts, converting `\\` path separator to `/`.
 */
export declare function pathJoin(...parts: string[]): string;
/**
 * Parses given .gitignore file contents to an array of string patterns. Adapted from https://github.com/sindresorhus/globby .
 */
export declare function parseGitIgnore(content: string, options?: {
    cwd: string;
    fileName: string;
}): string[];
/**
 * Converts Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`. Adapted from https://github.com/sindresorhus/slash/ .
 */
export declare function slash(path: string): string;
export declare function detectNewline(s: string, def?: string): string;
export declare function withFinalSlash(s: string): string;
