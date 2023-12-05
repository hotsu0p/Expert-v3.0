import { getObjectProperty, getObjectPropertyPaths, objectKeys, objectMapValues, setObjectProperty } from '../object'

describe('object', () => {
  it('objectMap', () => {
    expect(objectMapValues({ a: 1, b: 2 }, (i, v) => v * 2)).toEqual({ a: 2, b: 4 })
  })

  describe('objectKeys', () => {
    it('objectKeys', () => {
      expect(objectKeys({ a: null, b: 8, c: 0, d: '', e: undefined })).toEqual(['a', 'b', 'c', 'd', 'e'])
    })

    it('should list array index', () => {
      expect(objectKeys([0, '', undefined, null, false])).toEqual(['0', '1', '2', '3', '4'])
    })
  })

  describe('setObjectProperty , getObjectProperty, getObjectPropertyPaths', () => {
    it('should work with arrays', () => {
      const o = setObjectProperty({}, ['foo', 0, 'bar'], 'hello')
      expect(o).toEqual({ foo: [{ bar: 'hello' }] })
      expect(getObjectProperty(o, ['foo', 0, 'bar'])).toEqual('hello')
      expect(getObjectProperty(o, 'foo.0.bar')).toEqual('hello')
      expect(setObjectProperty({}, ['foo', 0, 'bar', 0, 0], 'hello')).toEqual({ foo: [{ bar: [['hello']] }] })
    })

    it('should throw if number path item correspond to non array value', () => {
      expect(() => setObjectProperty({ a: {} }, ['a', 0, 'bar'], 'hello')).toThrow()
    })

    it('getObjectPropertyPaths should return all paths of object ignoring array elements by default', () => {
      expect(getObjectPropertyPaths({ a: {}, s: ['a', 0, 'bar'] })).toEqual([['a'], ['s']])
    })

    it('getObjectPropertyPaths should not ignore  array elements if option is passed', () => {
      expect(
        getObjectPropertyPaths({ a: { b: { c: 1 } }, s: ['a', 0, 'bar'] }, { ignoreArrayElements: false })
      ).toEqual([['a'], ['s'], ['a', 'b'], ['s', 0], ['s', 1], ['s', 2], ['a', 'b', 'c']])
    })

    it('getObjectPropertyPaths should return only leafs paths if option is passed', () => {
      expect(getObjectPropertyPaths({ a: { b: { c: 1 } }, s: ['a', { o: 0 }] }, { leafsOnly: true })).toEqual([
        ['s', 0],
        ['a', 'b', 'c'],
        ['s', 1, 'o']
      ])
    })
  })
})
