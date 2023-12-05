import { printMs } from '../../time/printMs'

describe('time/printMs', () => {
  it('should work', () => {
    expect(printMs(9887)).toBe('9 seconds 887 ms')
    expect(printMs(9333)).toBe('9 seconds 333 ms')
  })
})
