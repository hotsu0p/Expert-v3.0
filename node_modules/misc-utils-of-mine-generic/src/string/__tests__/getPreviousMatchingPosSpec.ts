import { getPreviousMatchingPos } from '../..'

describe('getPreviousMatchingPos', () => {
  it('using literal', () => {
    const s = `hello how are you? I hope you are fine`
    const index = getPreviousMatchingPos(s, 10, 'h')
    expect(index).toBe(6)
    expect(s.charAt(index)).toBe('h')
  })
  it('using fn', () => {
    const s = `hello how are you? I hope you are fine`
    const index = getPreviousMatchingPos(s, s.length, 'i')
    expect(index).toBe(s.length - 3)
    expect(s.charAt(index)).toBe('i')
  })
  it('should return -1 if not found', () => {
    const s = `hello how are you? I hope you are fine`
    const index = getPreviousMatchingPos(s, s.length, 'x')
    expect(index).toBe(-1)
  })
  it('index==0', () => {
    const s = `hello how are you? I hope you are fine`
    const index = getPreviousMatchingPos(s, 3, 'h')
    expect(index).toBe(0)
    expect(s.charAt(index)).toBe('h')
  })

  it('should not fail if given pos is out of range', () => {
    const s = `hello how are you? I hope you are fine`
    const index = getPreviousMatchingPos(s, 300, 'e')
    expect(index).toBe(s.length - 1)
    expect(s.charAt(index)).toBe('e')
  })
})
