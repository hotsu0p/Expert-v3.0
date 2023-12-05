export declare function formatDate(date: Date, format: 'YYYY-MM-DD' | 'MM/DD/YYYY'): string;
export declare function formatDateTime(date: Date, format: 'YYYY-MM-DDTHH:MMZ'): string;
/** formats date to YYYY-MM-DD HH:mm:ss, compatible with sql dates */
export declare function formatDateTimeForSql(date: Date): any;
/**
 * shirks Date.now number to N digits so is better for filenames. respect date order and  milliseconds
 */
export declare function timeHash(digits?: number): string;
