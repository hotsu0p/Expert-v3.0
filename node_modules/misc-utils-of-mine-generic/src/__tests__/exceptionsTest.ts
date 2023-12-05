import { expectType } from 'tsd-check'
import { tryTo } from '../exceptions'

describe('tryTo', () => {
  it('respect types', () => {
    function a(a: number) {
      return 1 + 1
    }
    const b = tryTo(() => a(1))
    expectType<number | undefined>(b)
  })

  it('respect default value type', () => {
    function a(a: number) {
      return 1 + 1
    }
    const b = tryTo(() => a(1), new Date())
    expectType<number | Date | undefined>(b)
  })
})
