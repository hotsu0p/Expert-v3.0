import { findDescendant, Node, visitDescendants } from '../tree'

describe('tree', () => {
  it('visitDescendants', () => {
    interface N extends Node { name: string, childNodes?: N[], parentNode?: N }
    var t: N = {
      name: 'a', childNodes: [
        { name: 'a1' }, {
          name: 'a2', childNodes: [
            { name: 'a21' }, { name: 'a22' }, { name: 'a23' }
          ]
        }, { name: 'a3' }
      ]
    }
    var a: string[] = []
    visitDescendants(t, n => { a.push(n.name); return false })
    expect(a).toEqual(['a1', 'a2', 'a21', 'a22', 'a23', 'a3'])
    var a23 = findDescendant(t, n => n.name === 'a23')
    expect(a23).toEqual({ name: 'a23' })
  })
})
