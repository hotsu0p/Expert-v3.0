import { randomIntBetween } from './number'

/**
 * Transforms a color string like `rgb(0,0,0)` to a color string in hex syntax like `#000000`
 */
export function rgb2Hex(s: string) {
  //@ts-ignore
  return s.match(/[0-9]+/g)!.reduce((a, b: any) => a + (b | 256).toString(16).slice(1), '#').toString(16)
}

export function randomCssColor() {
  return `rgb(${randomIntBetween(0, 255)}, ${randomIntBetween(0, 255)}, ${randomIntBetween(0, 255)})`
}
