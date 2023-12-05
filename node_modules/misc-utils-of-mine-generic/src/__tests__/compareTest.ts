import { compareText, compareTexts } from '..'

describe('compare', () => {
  it('compareText contains, contained', () => {
    expect(compareText('class123', 'class', { verb: 'contains' })).toBe(true)
    expect(compareText('class123', 'xx', { verb: 'contains' })).toBe(false)
    expect(compareText('class123', 'class', { verb: 'contained' })).toBe(false)
    expect(compareText('class123', 'class12322', { verb: 'contained' })).toBe(true)
  })

  it('compareText negate', () => {
    expect(compareText('class123', 'class', { negate: true, verb: 'contains' })).toBe(false)
    expect(compareText('class123', 'xx', { negate: true, verb: 'contains' })).toBe(true)
    expect(compareText('class123', 'class', { negate: true, verb: 'contained' })).toBe(true)
    expect(compareText('class123', 'class12322', { negate: true, verb: 'contained' })).toBe(false)
  })

  it('compareTexts multiplicity contains, contained', () => {
    expect(compareTexts(['foo123', 'bar123'], ['foo'], { verb: 'contains' })).toBe(true)
    expect(compareTexts(['foo123', 'bar123'], 'foo', { verb: 'contains', multiplicity: 'allOf' })).toBe(false)
    expect(compareTexts(['foo123', 'bar123'], ['foo123123'], { verb: 'contained' })).toBe(true)
    expect(compareTexts(['foo123', 'bar123'], ['s'], { verb: 'contained' })).toBe(false)
    expect(compareTexts(['foo123', 'bar123'], 'foo123123', { verb: 'contained', multiplicity: 'allOf' })).toBe(false)
    expect(compareTexts(['foo123', 'bar123'], 'foo123123bar123123', { verb: 'contained', multiplicity: 'allOf' })).toBe(
      true
    )
  })

  it('compareTexts allOf issue 1', () => {
    expect(compareTexts(['B', 'A'], ['C', 'B', 'A'], { verb: 'equals', multiplicity: 'allOf' })).toBe(true)
  })
  it('compareTexts allOf issue 2', () => {
    expect(compareTexts(['B', 'A', 'ABC'], ['C', 'B', 'A'], { verb: 'equals', multiplicity: 'allOf' })).toBe(false)
  })
  it('compareTexts allOf issue 3', () => {
    expect(compareTexts(['B', 'A', 'ABC'], ['C', 'B', 'A'], { verb: 'contains', multiplicity: 'allOf' })).toBe(true)
  })
})
