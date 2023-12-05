import { Deferred } from '../promise'

describe('promise', () => {
  describe('deferred', () => {
    it('reject, resolve, status', async () => {
      class Api {
        fooReady = new Deferred<String[]>()
        bar = new Deferred<void, number>()
        knower() {
          this.bar.catch(e => {
            setTimeout(() => this.fooReady.resolve(['1']), 1)
          })
        }
      }
      // user
      var api = new Api()
      api.knower()
      setTimeout(() => {
        expect(api.bar.status).toBe('pending')
        api.bar.reject(1)
        expect(api.bar.status).toBe('rejected')
      }, 10)
      expect(api.fooReady.status).toBe('pending')
      var r = await api.fooReady
      expect(r).toEqual(['1'])
      expect(api.fooReady.status).toBe('resolved')

    })
  })
})
