import { animate, easing } from '../time/anim'

describe('time/anim', () => {
  it('animate', async () => {
    const a: number[] = []
    await animate({
      duration: 102,
      timing: easing.easeInQuad(),
      lapse: 5,
      draw(progress) {
        a.push(Math.trunc(progress))
      }
    })
    expect(a.length).toBeGreaterThan(3)
  })

})
