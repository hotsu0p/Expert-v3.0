import { isPrime } from '../number'
import { bin2dec, binaryDigitNormalizer, binaryStraightNormalizer, dec2bin } from '../numberNormalization'

describe('number', () => {

  it('isPrime', () => {
    expect(isPrime(5)).toBe(true)
    expect(isPrime(6)).toBe(false)
  })

  describe('dec2bin, bin2dec', () => {

    it('baseConverter', () => {
      var input = 97
      var output = dec2bin(input)
      expect(output.join('')).toBe([1, 1, 0, 0, 0, 0, 1].join(''))
      expect(bin2dec(output)).toBe(input)
    })

    it('arrayLength', () => {
      var input = 97
      var output = dec2bin(input, 20)
      expect(output.length).toBe(20)
      expect(output.join('')).toBe([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1].join(''))
      // expect(bin2dec(input, 20)).toBe(input)
    })
  })

  it('binaryStraightNormalizer', () => {
    expect([dec2bin(13), binaryStraightNormalizer.encode(13, 8), binaryStraightNormalizer.decode(binaryStraightNormalizer.encode(13, 8))])
      .toEqual([[1, 1, 0, 1], [0, 0, 0, 0, 1, 1, 0, 1], 13])
  })

  it('binaryDigitNormalizer', () => {
    expect(binaryDigitNormalizer.encode(123)).toEqual([
      0, 0, 0, 1,
      0, 0, 1, 0,
      0, 0, 1, 1
    ])
    expect(binaryDigitNormalizer.decode([
      0, 0, 0, 1,
      0, 0, 1, 0,
      0, 0, 1, 1])).toEqual(123)
  })

})
