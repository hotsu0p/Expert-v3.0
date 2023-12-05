import { isNode } from '../environment'

describe('compare', () => {
  it('isNode', () => {
    expect(isNode()).toBe(true)
  })
})
