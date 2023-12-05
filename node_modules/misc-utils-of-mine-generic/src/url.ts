export function getFileNameFromUrl(url: string) {
  const hashIndex = url.indexOf('#')
  url = hashIndex !== -1 ? url.substring(0, hashIndex) : url
  return (url.split('/').pop() || '').replace(/[\?].*$/g, '')
}

export function getParametersFromUrl(url: string, options: { parseNumber?: boolean, parseBoolean?: boolean } = {}) {
  var queryString = url.split('?')[1]
  var obj: { [s: string]: string } = {}
  if (!queryString) {
    return obj
  }
  queryString = queryString.split('#')[0]
  var arr = queryString.split('&')
  for (var i = 0; i < arr.length; i++) {
    var a = arr[i].split('=')
    let value: any = a[1] || ''
    if (options.parseNumber) {
      const numeric = parseFloat(value)
      if (!isNaN(numeric)) {
        value = numeric
      }
    }
    if (options.parseBoolean) {
      if (['true', 'false'].includes(value)) {
        value = value === 'true' ? true : false
      }
    }
    obj[a[0]] = value
  }
  return obj
}

/** 
 * Returns true iff given url starts with a protocol ("http://", "https://", etc). 
 * Notice that this is not strictly the absolute url definition 
 */
export function isAbsoluteUrl(url: string) {
  return !!url.match(/^[^:]+:\/\//)
}

/**
 * Parse url, emulates window.location format
 */
export function parseUrl(url: string, options: { parseParams?: boolean } = {}) {
  const isAbsolute = isAbsoluteUrl(url)
  if (!isAbsolute) {
    url = 'http://foo.com' + (url.startsWith('/') ? '' : '/') + url
  }
  const results = /^([^:]+:)\/\/([^\/]+)(.*)/.exec(url)
  if (!results) {
    return null
  }
  let [all, protocol, domain, rest] = results
  let pathname = rest
  let i = pathname.indexOf('?')
  if (i !== -1) {
    pathname = pathname.substring(0, i)
  }
  // case no params: http://foo.com/bar#hash
  i = pathname.indexOf('#')
  if (i !== -1) {
    pathname = pathname.substring(0, i)
  }
  let search = ''
  i = rest.indexOf('?')
  if (i !== -1) {
    search = rest.substring(i)
    i = search.indexOf('#')
    if (i !== -1) {
      search = search.substring(0, i)
    }
  }
  let hash = ''
  i = rest.indexOf('#') // yes we're doing it twice
  if (i !== -1) {
    hash = rest.substring(i)
  }
  if (!isAbsolute) {
    domain = ''
    protocol = ''
  }
  return {
    protocol,
    domain,
    pathname,
    search,
    hash,
    params: options.parseParams ? getParametersFromUrl(url) : undefined
  }
}
