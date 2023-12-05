import { array, arrayRangePartition } from './array/create'

// function number2input_straight(a: number, inputSize?: number) {
//   const bin = dec2bin(a)
//   inputSize = typeof inputSize === 'undefined' ? bin.length : inputSize
//   if (bin.length > inputSize!) {
//     throw new Error('Number greater than input size')
//   }
//   return [...array(inputSize! - bin.length).map(i => 0), ...bin] as number[]
// }
// function input2number_straight(a: number[]) {
//   return bin2dec(a)
// }

interface Normalizer {
  encode(n: number, inputSize?: number): number[]
  decode(input: number[]): number
}

export const binaryStraightNormalizer: Normalizer = {
  encode(a: number, inputSize?: number) {
    const bin = dec2bin(a)
    inputSize = typeof inputSize === 'undefined' ? bin.length : inputSize
    if (bin.length > inputSize!) {
      throw new Error('Number greater than input size')
    }
    return [...array(inputSize! - bin.length).map(i => 0), ...bin] as number[]
  },
  decode(a: number[]) {
    return bin2dec(a)
  }
}

const digitLength = dec2bin(9).length
export const binaryDigitNormalizer: Normalizer = {
  encode(a: number, inputSize?: number) {
    const bin = `${a}`.split('').map(i => parseInt(i, 10)).map(i => dec2bin(i, digitLength)).flat()
    inputSize = typeof inputSize === 'undefined' ? bin.length : inputSize
    if (bin.length > inputSize) {
      throw new Error('Number greater than input size')
    }
    return [...array(inputSize - bin.length).map(i => 0), ...bin] as number[]
  },
  decode(input: number[]) {
    return arrayRangePartition(input, digitLength, 0).reverse().map(digit => bin2dec(digit)).reduce((acc, v, i) => acc + v * Math.pow(10, i))
  }
}

export const decimalDigitNormalizer: Normalizer = {
  encode(n: number, length?: number) {
    let r = `${n}`.split('').map(i => (parseInt(i) / 10))
    if (length && r.length > length) {
      throw new Error('greater than length')
    }
    if (length && r.length < length) {
      r = [...array(length - r.length).map(i => 0), ...r]
    }
    return r
  },
  decode(digits: number[]) {
    return parseInt(digits.map(d => Math.round(d * 10)).join(''))
  }
}

function ConvertBase(num: any) {
  return {
    from: function(baseFrom: any) {
      return {
        to: function(baseTo: number) {
          return parseInt(num, baseFrom).toString(baseTo)
        }
      }
    }
  }
}
function bin2dec_(num: any) {
  return ConvertBase(num).from(2).to(10)
}
function dec2bin_(num: any) {
  return ConvertBase(num).from(10).to(2)
}
function string2array(s: string) {
  var numbers: number[] = []
  for (var i = 0; i < s.length; i++) {
    numbers.push(Math.round(parseFloat(s[i])))
  }
  return numbers
}
export function dec2bin(number: number, arrayLength?: number) {
  var a = string2array(dec2bin_(number))
  if (arrayLength) {
    if (a.length > arrayLength) {
      throw new Error('array length already exceeded by input')
    }
    var diff = arrayLength - a.length
    for (var i = 0; i < diff; i++) {
      a.unshift(0)
    }
  }
  return a
}
export function bin2dec(number: any[]) {
  return Math.round(parseFloat(bin2dec_(number.join(''))))
}
