"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTime = void 0;
// const t0 = new Date(0)
/**
 * It partitions the time line in `config.step` milliseconds and get's the next time interval start time from given date.
 * Useful to schedule tasks or expire stuff, like, "give me the next weekly day"
 */
function nextTime(config) {
    var t0 = config.startingDate ? config.startingDate.getTime() : 0;
    var t = config.from.getTime();
    if (t <= config.step) {
        throw Error('step too large');
    }
    var result = (Math.ceil(t / config.step)) * config.step + t0;
    // console.log(`mod: ${t % config.step}, division: ${t/config.step}`);
    // console.log(`next time from ${t}, step ${config.step} starting from ${t0} is ${result}`);
    return new Date(result);
}
exports.nextTime = nextTime;
//# sourceMappingURL=nextTime.js.map