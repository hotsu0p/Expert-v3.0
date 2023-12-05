import { basename, dirname, withoutExtension } from '..'
import { getFileExtension, getRelativePath, parseGitIgnore, pathJoin } from '../file'

describe('file', () => {
  it('basename', () => {
    expect(basename('/usr/name.txt')).toBe('name.txt')
    expect(basename('../bar/foo.txt')).toBe('foo.txt')
  })

  it('dirname', () => {
    expect(dirname('foo.txt')).toBe('')
    expect(dirname('../bar/foo.txt')).toBe('../bar')
    expect(dirname('/usr/name.txt')).toBe('/usr')
  })

  it('withoutExtension', () => {
    expect(withoutExtension('tmp/xml')).toBe('tmp/xml')
    expect(withoutExtension('/usr/name.txt')).toBe('/usr/name')
    expect(withoutExtension('tmp/xml/d0-d03-classcv_1_1detail_1_1GraphCutSeamFinderBase.xml')).toBe(
      'tmp/xml/d0-d03-classcv_1_1detail_1_1GraphCutSeamFinderBase'
    )
    expect(dirname(withoutExtension('tmp/xml/d0-d03-classcv_1_1detail_1_1GraphCutSeamFinderBase.xml'))).toBe('tmp/xml')
    expect(withoutExtension(dirname('tmp/xml/d0-d03-classcv_1_1detail_1_1GraphCutSeamFinderBase.xml'))).toBe('tmp/xml')
  })

  it('getRelativePath', () => {
    expect(getRelativePath('/users/eric/src/csslint', '/users/eric/style.css')).toBe('../../style.css')

    expect(getRelativePath('.', 'foo.txt')).toBe('foo.txt')
  })

  it('pathJoin', () => {
    expect(pathJoin('s', '..', 'b')).toBe('s/../b')
  })

  it('getFileExtension', () => {
    expect(getFileExtension('foo.min.js')).toBe('js')
  })

  it('parseGitIgnore', () => {
    expect(
      parseGitIgnore(`
node_modules
dist
# npm pack files
*.tgz
`)
    ).toEqual(['node_modules', 'dist', '*.tgz'])
  })
})
