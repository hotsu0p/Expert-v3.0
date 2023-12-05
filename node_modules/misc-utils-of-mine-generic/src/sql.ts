// misc utilities when working with particular programming languages

import { formatDateTimeForSql, quote } from '.';

/** when executing sql queries on we often invoke 
 * `await query('select foo from bar where userId=?', [userId])` 
 * Use this function when you have lots of parameters to generate an executable query ready to debug 
 * (joins/escapes params into the sql string). Supports strings, numbers lists and dates */
export function printSQLQuery(sql: string, params: any[]) {
  let counter = 0
  return sql
    .replace(/(\?)/g, (txt, key) => {
      return escapeSQLValue(params[counter++])
    });
}

export function escapeSQLValue(value: any): string {
  if (typeof value === 'string') {
    return `${quote(value, '"')}`
  } else if (value instanceof Date) {
    return formatDateTimeForSql(value)
  } else if (Array.isArray(value)) {
    return value.map(escapeSQLValue).join(',')
  } else {
    return `${value}`
  }
}

type MapSqlParams = {
  [k: string]: any;
};

export function printSQLMapQuery(sql: string, mapParams: MapSqlParams) {
  const r = mapToArraySQLConvert(sql, mapParams)
  return printSQLQuery(r.sql, r.params)
}

/** utility to convert from map syntax like 
 * {sql: 'select n from p where a=:id', params: {id: 123}} 
 * to common query array syntax like 
 * {sql: 'select n from p where a=?', params: [123]} which is what normally sql drivers support
 * */
export function mapToArraySQLConvert(sql: string, params: MapSqlParams): { sql: string, params: any[] } {
  const resultsParams: any[] = []
  let resultSql = sql
    .replace(/:(\w+)/g, (txt, key) => {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        resultsParams.push(params[key])
        return '?';
      }
      return txt;
    })
  // .replace(/\$(\w+)/g, (txt, key) => {
  //   if (Object.prototype.hasOwnProperty.call(values, key)) {
  //     return pool.escapeId(values[key]);
  //   }
  //   return txt;
  // });
  return {
    sql: resultSql,
    params: resultsParams
  }

}