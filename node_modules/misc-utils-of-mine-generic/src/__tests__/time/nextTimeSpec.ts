import { nextTime, NextTimeConfig } from '../..'

describe('time/nextTime', () => {
  it('should work with 0 as default startingDate', () => {
    const config: NextTimeConfig = {
      step: 100,
      from: new Date(850),
      // startingDate: new Date(0)
    }
    const result = nextTime(config)
    expect(result.getTime()).toBe(900)
    // console.log(`next time from ${config.from.getTime()}, step ${config.step} starting from ${config.startingDate ?.getTime()} is ${result}`)
  })

  it('should work with other startingDate', () => {
    const config: NextTimeConfig = {
      step: 100,
      from: new Date(850),
      startingDate: new Date(80)
    }
    const result = nextTime(config)
    expect(result.getTime()).toBe(980)
    // console. log(`next time from ${config.from.getTime()}, step ${config.step} starting from ${config.startingDate ?.getTime()} is ${result}`)
  })
})
