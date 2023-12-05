import { counter } from '..'

export function escapeHtmlAttribute(code: string) {
  return code.replace(/\"/gim, '&quot;')
}

export function unEscapeHtmlAttribute(code: string) {
  return code.replace(/\&quot\;/gim, '"')
}

export function wrapInHtml(s: string): string {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${s}
</body>
</html>
`
}

/**
 * transform an object like `{fooBar: 'value 123'}` to an string like `foo-bar: value 123`.
 */
export function styleObjectToCss(o: Partial<{ [k: string]: string | null | undefined }>, propertiesSeparator = '') {
  return Object.keys(o)
    .map(p => `${stylePropertyNameToCssSyntax(p)}: ${(o as any)[p]};`)
    .join(propertiesSeparator)
}

/**
 * Transform a string like `fooBar` to `foo-bar`
 */
export function stylePropertyNameToCssSyntax(s: string): string {
  let t
  while ((t = /([A-Z])/.exec(s))) {
    s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length)
  }
  return s
}

export interface HtmlElementConfig {
  name: string
  attributes?: { name: string, value: string }[]
  children?: HtmlElementConfig[]
  innerHTML?: string
  /** by default, if there's no children or innerHTML we use a single-closing tag like `<tag/>`.  If this is true will force the format <tag></tag> always. */
  forceContent?: boolean
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
export function htmlElement(config: HtmlElementConfig): string {
  const hasContent = config.forceContent || config.innerHTML || (config.children || []).length
  let s = `<${config.name}`
  if (config.attributes) {
    // TODO: escape a.value
    s += ' ' + config.attributes.map(a => `${a.name}="${a.value}"`).join(' ')
  }
  if (hasContent) {
    s += '>'
  }
  if (config.children) {
    const children = config.children.map(c => htmlElement(c))
    s += `${children.join('')}`
  }
  s += config.innerHTML || ''
  if (hasContent) {
    s += `</${config.name}>`
  } else {
    s += `/>`
  }
  return s
}

/**
 * adds a parameter named `param` with a value that tries to be unique. The intending behavior is to add a "nocache" parameter
 */
export function addUniqueParam(url: string, param: string) {
  const value = `${counter() + Math.random()}`//.replace(/\./g, '')
  if (url.includes('?')) {
    return `${url}&${param}=${value}`;
  } else {
    return `${url}?${param}=${value}`;
  }
}
