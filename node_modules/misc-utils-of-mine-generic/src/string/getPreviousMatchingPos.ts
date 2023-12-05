/**
 * Get index of the previous match of given predicate or substring, before given pos, on given text. For the next matching position you can use `String.prototype.findIndexOf` function.
 */
export function getPreviousMatchingPos(text: string, pos: number, predicate: string | ((char: string) => boolean)) {
  pos = text.length <= pos ? text.length : pos
  if (typeof predicate === 'string') {
    const s = predicate
    predicate = c => c === s
  }
  while (pos >= 0) {
    const char = text[pos]
    if (!predicate(char)) {
      pos--
    } else {
      break
    }
  }
  return pos
}

/**
 * Gets index of n-th match of given substring on given string.
 */
export function getPosition(string: string, subString: string, n: number) {
  return string.split(subString, n).join(subString).length
}
