export declare function escapeHtmlAttribute(code: string): string;
export declare function unEscapeHtmlAttribute(code: string): string;
export declare function wrapInHtml(s: string): string;
/**
 * transform an object like `{fooBar: 'value 123'}` to an string like `foo-bar: value 123`.
 */
export declare function styleObjectToCss(o: Partial<{
    [k: string]: string | null | undefined;
}>, propertiesSeparator?: string): string;
/**
 * Transform a string like `fooBar` to `foo-bar`
 */
export declare function stylePropertyNameToCssSyntax(s: string): string;
export interface HtmlElementConfig {
    name: string;
    attributes?: {
        name: string;
        value: string;
    }[];
    children?: HtmlElementConfig[];
    innerHTML?: string;
    /** by default, if there's no children or innerHTML we use a single-closing tag like `<tag/>`.  If this is true will force the format <tag></tag> always. */
    forceContent?: boolean;
}
/**
 * ```
 * htmlElement({
      name: 'a',
      attributes: [{name: 'href', value: 'foo.com'}, {name: 'id', value: 'clickMe'}],
      innerHTML: 'click me'
    })
  ```
 * will return something like:
 *
 * ```
 * <a href="foo.com" id="clickMe">click me</a>
 * ```
 *
 * TODO: indentLevel
 */
export declare function htmlElement(config: HtmlElementConfig): string;
/**
 * adds a parameter named `param` with a value that tries to be unique. The intending behavior is to add a "nocache" parameter
 */
export declare function addUniqueParam(url: string, param: string): string;
