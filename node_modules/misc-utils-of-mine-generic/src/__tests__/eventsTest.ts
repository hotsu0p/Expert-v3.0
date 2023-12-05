import { Emitter } from '../event'

describe('events', () => {
  describe('Emitter', () => {
    it('listeners', () => {
      const e = new Emitter()
      let counter = 0
      const l = (e: any) => { counter++ }
      e.add(l)
      expect(counter).toBe(0)
      e.emit(1)
      expect(counter).toBe(1)
      e.remove(l)
      e.emit(1)
      expect(counter).toBe(1)
      e.add(l)
      expect(counter).toBe(1)
      e.emit(1)
      expect(counter).toBe(2)
      e.remove(l)
      e.emit(1)
      expect(counter).toBe(2)
    })
  })
})
