import { template } from '../template'

describe('template', () => {
  it('should render', () => {
    const t = `Hello <%= name %>`
    const r = template(t, { name: 'seba' })
    expect(r).toBe('Hello seba')
  })

  xit('should not modify spacing', () => {
    const t = `
    # c1
    identify \\
    # c2
    <%= name %>
    # c3
    `
    const r = template(t, { name: 'seba' })
    expect(r).toBe('Hello seba')
  })
})
