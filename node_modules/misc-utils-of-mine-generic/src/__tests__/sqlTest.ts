import { mapToArraySQLConvert, printSQLMapQuery, printSQLQuery } from '../sql'

describe('langs', () => {
  it('printSQLQuery', () => {
    const sql = 'select id from users where userId=? and name=? and interest in (?)'
    const params = [12, 'seba', [0, 9, 8]]
    const result = printSQLQuery(sql, params)
    expect(result).toBe('select id from users where userId=12 and name="seba" and interest in (0,9,8)')
  })

  it('mapToArraySQLConvert', () => {
    expect(mapToArraySQLConvert('select a from p where b=:b', { b: 123 }))
      .toEqual({ sql: 'select a from p where b=?', params: [123] })
    expect(mapToArraySQLConvert('select a from p where b IN (:list)', { list: ['a', 'b'] }))
      .toEqual({ sql: 'select a from p where b IN (?)', params: [['a', 'b']] })
  })

  it('printSQLMapQuery', () => {
    expect(printSQLMapQuery('select a from p where b IN (:list)', { list: ['a', 'b'] }))
      .toEqual('select a from p where b IN ("a","b")')
  })
})
