export interface NextTimeConfig {
    /** the date from which to obtain next date according to given step */
    from: Date;
    /** interval length in ms */
    step: number;
    startingDate?: Date;
}
/**
 * It partitions the time line in `config.step` milliseconds and get's the next time interval start time from given date.
 * Useful to schedule tasks or expire stuff, like, "give me the next weekly day"
 */
export declare function nextTime(config: NextTimeConfig): Date;
