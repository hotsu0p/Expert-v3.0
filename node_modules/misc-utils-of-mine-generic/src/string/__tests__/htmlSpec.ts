import { styleObjectToCss } from '../html'
describe('string/html', () => {
  it('styleObjectToCss', () => {
    expect(styleObjectToCss({ fooBar: 'hello world', otherProp: '3 a B' })).toBe(
      `foo-bar: hello world;other-prop: 3 a B;`
    )
  })
})
