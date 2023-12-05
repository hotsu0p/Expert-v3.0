import { merge } from '../merge'

describe('merge', () => {
  it('recursive', () => {
    const a = { gg: [{ jj: { g: 0, j: 2 } }], b: { t: 's', c: { d: 1 } } }
    const b = { gg: [{ jj: { g: 0 } }], b: { c: { d: 2, k: 7 } } }

    expect(merge(true, true, a, b)).toEqual({ b: { c: { d: 2, k: 7 }, t: 's' }, gg: [{ jj: { g: 0 } }] }) // HEADS UP - overriding array value.
  })
})
