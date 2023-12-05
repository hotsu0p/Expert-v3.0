import { BorderSide, BorderStyle, getBoxChar } from '../boxes'
describe('string/boxes', () => {
  it('getBoxChar', () => {
    expect(getBoxChar(BorderStyle.double, BorderSide.bottomLeft)).toBe('╚')
  })
})
