"use strict";
// misc utilities when working with particular programming languages
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToArraySQLConvert = exports.printSQLMapQuery = exports.escapeSQLValue = exports.printSQLQuery = void 0;
var _1 = require(".");
/** when executing sql queries on we often invoke
 * `await query('select foo from bar where userId=?', [userId])`
 * Use this function when you have lots of parameters to generate an executable query ready to debug
 * (joins/escapes params into the sql string). Supports strings, numbers lists and dates */
function printSQLQuery(sql, params) {
    var counter = 0;
    return sql
        .replace(/(\?)/g, function (txt, key) {
        return escapeSQLValue(params[counter++]);
    });
}
exports.printSQLQuery = printSQLQuery;
function escapeSQLValue(value) {
    if (typeof value === 'string') {
        return "" + _1.quote(value, '"');
    }
    else if (value instanceof Date) {
        return _1.formatDateTimeForSql(value);
    }
    else if (Array.isArray(value)) {
        return value.map(escapeSQLValue).join(',');
    }
    else {
        return "" + value;
    }
}
exports.escapeSQLValue = escapeSQLValue;
function printSQLMapQuery(sql, mapParams) {
    var r = mapToArraySQLConvert(sql, mapParams);
    return printSQLQuery(r.sql, r.params);
}
exports.printSQLMapQuery = printSQLMapQuery;
/** utility to convert from map syntax like
 * {sql: 'select n from p where a=:id', params: {id: 123}}
 * to common query array syntax like
 * {sql: 'select n from p where a=?', params: [123]} which is what normally sql drivers support
 * */
function mapToArraySQLConvert(sql, params) {
    var resultsParams = [];
    var resultSql = sql
        .replace(/:(\w+)/g, function (txt, key) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            resultsParams.push(params[key]);
            return '?';
        }
        return txt;
    });
    // .replace(/\$(\w+)/g, (txt, key) => {
    //   if (Object.prototype.hasOwnProperty.call(values, key)) {
    //     return pool.escapeId(values[key]);
    //   }
    //   return txt;
    // });
    return {
        sql: resultSql,
        params: resultsParams
    };
}
exports.mapToArraySQLConvert = mapToArraySQLConvert;
//# sourceMappingURL=sql.js.map