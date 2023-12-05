/** when executing sql queries on we often invoke
 * `await query('select foo from bar where userId=?', [userId])`
 * Use this function when you have lots of parameters to generate an executable query ready to debug
 * (joins/escapes params into the sql string). Supports strings, numbers lists and dates */
export declare function printSQLQuery(sql: string, params: any[]): string;
export declare function escapeSQLValue(value: any): string;
declare type MapSqlParams = {
    [k: string]: any;
};
export declare function printSQLMapQuery(sql: string, mapParams: MapSqlParams): string;
/** utility to convert from map syntax like
 * {sql: 'select n from p where a=:id', params: {id: 123}}
 * to common query array syntax like
 * {sql: 'select n from p where a=?', params: [123]} which is what normally sql drivers support
 * */
export declare function mapToArraySQLConvert(sql: string, params: MapSqlParams): {
    sql: string;
    params: any[];
};
export {};
