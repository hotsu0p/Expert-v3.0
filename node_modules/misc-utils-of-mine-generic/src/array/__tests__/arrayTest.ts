import { arrayRangePartition, fill, randomItems } from '../create'
import { arrayDifference, arrayInterception, arrayUnion } from '../set'

describe('array', () => {

  it('arrayUnion', () => {
    expect(arrayUnion([{ a: 1 }, { a: 2 }], [{ a: 1 }, { a: 2 }], (a, b) => a.a === b.a)).toEqual([{ a: 1 }, { a: 2 }])
  })

  it('arrayInterception', () => {
    expect(arrayInterception([{ a: 1 }, { a: 2 }], [{ a: 1 }, { a: 2 }], (a, b) => a.a === b.a)).toEqual([
      { a: 1 },
      { a: 2 }
    ])
  })

  it('arrayDifference', () => {
    expect(arrayDifference([{ a: 1 }, { a: 2 }], [{ a: 1 }, { a: 2 }], (a, b) => a.a === b.a)).toEqual([])
  })

  it('randomItems', () => {
    expect(randomItems([1, 2, 3, 4, 5], 2).length).toBe(2)
  })

  it('arrayRangePartition', () => {
    expect(arrayRangePartition([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]])
    expect(arrayRangePartition([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]])
    expect(arrayRangePartition([1, 2, 3, 4, 5, 6, 7, 8], 3, 0)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 0]])
  })

  it('fill', () => {
    expect(fill([1, 2, 3], 5, 0, true)).toEqual([0, 0, 1, 2, 3])
    expect(fill([1, 2, 3], 5, 0, false)).toEqual([1, 2, 3, 0, 0])
  })
})
