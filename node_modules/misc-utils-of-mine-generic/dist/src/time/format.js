"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeHash = exports.formatDateTimeForSql = exports.formatDateTime = exports.formatDate = void 0;
function formatDate(date, format) {
    if (typeof date === 'string') {
        // happens when serializing dates to json for testing
        date = new Date(date);
    }
    var dd = date.getDay();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (format === 'YYYY-MM-DD') {
        return yyyy + '-' + mm + '-' + dd;
    }
    else {
        return mm + "/" + dd + "/" + yyyy;
    }
}
exports.formatDate = formatDate;
function formatDateTime(date, format) {
    if (typeof date === 'string') {
        // happens when serializing dates to json for testing
        date = new Date(date);
    }
    var hh = ("" + date.getHours()).length < 2 ? "0" + date.getHours() : "" + date.getHours();
    var mm = ("" + date.getMinutes()).length < 2 ? "0" + date.getMinutes() : "" + date.getMinutes();
    return formatDate(date, 'YYYY-MM-DD') + "T" + hh + ":" + mm;
}
exports.formatDateTime = formatDateTime;
/** formats date to YYYY-MM-DD HH:mm:ss, compatible with sql dates */
function formatDateTimeForSql(date) {
    if (typeof date === 'string') {
        // happens when serializing dates to json for testing
        date = new Date(date);
    }
    var hh = ("" + date.getHours()).length < 2 ? "0" + date.getHours() : "" + date.getHours();
    var mm = ("" + date.getMinutes()).length < 2 ? "0" + date.getMinutes() : "" + date.getMinutes();
    var ss = ("" + date.getSeconds()).length < 2 ? "0" + date.getSeconds() : "" + date.getSeconds();
    return formatDate(date, 'YYYY-MM-DD') + " " + hh + ":" + mm + ":" + ss;
}
exports.formatDateTimeForSql = formatDateTimeForSql;
/**
 * shirks Date.now number to N digits so is better for filenames. respect date order and  milliseconds
 */
function timeHash(digits) {
    if (digits === void 0) { digits = 36; }
    return Date.now().toString(digits);
}
exports.timeHash = timeHash;
//# sourceMappingURL=format.js.map