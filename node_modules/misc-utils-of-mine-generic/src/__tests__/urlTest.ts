import { getFileNameFromUrl, getParametersFromUrl, isAbsoluteUrl, parseUrl } from '../url'

describe('url', () => {
  const absUrl1 = 'https://foo.bar/qs/bar/js-function-to-get-filename-from-url#comment95124061_53560218'
  const relativeUrl1 = 'questions/511761/js-function.min.js?bar=9.9&y=1#/src/jjj?=9.9'

  describe('getFileNameFromUrl', () => {
    it('absolute, hash and no extension', () => {
      expect(
        getFileNameFromUrl(absUrl1)
      ).toBe('js-function-to-get-filename-from-url')
    })

    it('relative, extension and paramters', () => {
      expect(getFileNameFromUrl('../foo.png?ar=8')).toBe('foo.png')
    })

    it('file name with multiple dots, hash with slash', () => {
      expect(getFileNameFromUrl(relativeUrl1)).toBe(
        'js-function.min.js'
      )
    })
  })

  describe('getParametersFromUrl', () => {
    it('absolute, hash and no extension', () => {
      expect(
        getParametersFromUrl(absUrl1)
      ).toEqual({})
    })

    it('relative, extension and paramters', () => {
      expect(getParametersFromUrl('../foo.png?ar=8')).toEqual({ ar: '8' })
    })

    it('file name with multiple dots, hash with slash', () => {
      expect(getParametersFromUrl(relativeUrl1)).toEqual({
        bar: '9.9',
        y: '1'
      })
    })
  })


  describe('isAbsoluteUrl', () => {
    it('basic', () => {
      expect(isAbsoluteUrl(absUrl1)).toBe(true)
      expect(isAbsoluteUrl('qs/bar/js-function-to-get-filename-from-url#comment95124061_53560218')).toBe(false)
      expect(isAbsoluteUrl('/qs/bar/js-function-to-get-filename-from-url#comment95124061_53560218')).toBe(false)
    })
  })

  describe('parseAbsoluteUrl', () => {
    it('should parse absolute', () => {
      expect(parseUrl('http://foo.asd.com:1234/project/123?limit=2#anchor')).toEqual({
        protocol: 'http:',
        domain: 'foo.asd.com:1234',
        pathname: '/project/123',
        search: '?limit=2',
        hash: '#anchor'
      })
      expect(parseUrl(absUrl1)).toEqual({
        protocol: 'https:',
        domain: 'foo.bar',
        pathname: '/qs/bar/js-function-to-get-filename-from-url',
        search: '',
        hash: '#comment95124061_53560218'
      })
    })

    it('should parse relative', () => {
      expect(parseUrl('project/123?limit=2#anchor')).toEqual({
        protocol: '',
        domain: '',
        pathname: '/project/123',
        search: '?limit=2',
        hash: '#anchor'
      })
    })

  })

})
