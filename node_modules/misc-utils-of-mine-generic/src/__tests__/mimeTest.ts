import { getMimeTypeForExtension } from '../mime'

describe('mime', () => {
  describe('getMimeTypeForExtension', () => {
    it('known images', () => {
      expect(getMimeTypeForExtension('gif')).toBe('image/gif')
      expect(getMimeTypeForExtension('png')).toBe('image/png')
      expect(getMimeTypeForExtension('jpg')).toBe('image/jpeg')
      expect(getMimeTypeForExtension('jpeg')).toBe('image/jpeg')
      expect(getMimeTypeForExtension('svg')).toBe('image/svg+xml')
    })
  })
})
