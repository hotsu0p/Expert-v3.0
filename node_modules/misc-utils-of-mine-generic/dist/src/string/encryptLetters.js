"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptLetters = exports.encryptLetters = void 0;
/**
 * returns config.input encrypted digit by digit with given password and universe.
 * input and password must be contained in universe and have same length.
 * each number in the password is used to encrypt the corresponding input digit
 */
function encryptLetters(config) {
    // TODO: check that input, output and password must be contained in universe
    // TODO: check that universe must not have repeated symbols. 
    if (config.password.length < config.input.length) {
        throw new Error("password length must be same or greater than input's");
    }
    var input = config.input.split('');
    var r = input.map(function (inputChar, inputIndex) {
        var _a = preconditions(config, inputChar, inputIndex), universeIndex = _a.universeIndex, delta = _a.delta;
        var r = (universeIndex + delta) % config.universe.length;
        if (r < 0) {
            r = config.universe.length + r;
        }
        return config.universe[r];
    });
    return r.join('');
}
exports.encryptLetters = encryptLetters;
/**
 * returns config.input decrypted digit by digit with given password and universe.
 * input and password must be contained in universe and have same length.
 * each number in the password is used to encrypt the corresponding input digit
 */
function decryptLetters(config) {
    // TODO: check that input, output and password must be contained in universe
    // TODO: check that universe must not have repeated symbols. 
    if (config.password.length < config.input.length) {
        throw new Error("password length must be same or greater than input's");
    }
    var input = config.input.split('');
    var r = input.map(function (inputChar, inputIndex) {
        var _a = preconditions(config, inputChar, inputIndex), universeIndex = _a.universeIndex, delta = _a.delta;
        var r = (universeIndex - delta) % config.universe.length;
        if (r < 0) {
            r = config.universe.length + r;
        }
        // console.log({ universeIndex, delta, universeLength: config.universe.length, result: r });
        return config.universe[r];
    });
    return r.join('');
}
exports.decryptLetters = decryptLetters;
function preconditions(config, inputChar, inputIndex) {
    var universeIndex = config.universe.indexOf(inputChar);
    if (universeIndex === -1) {
        throw new Error("input contains char \"" + inputChar + "\" that's not present in the universe");
    }
    var delta = config.password[inputIndex];
    if (delta === -1) {
        throw new Error("input contains char \"" + inputChar + "\" that's not present in the universe");
    }
    return { universeIndex: universeIndex, delta: delta };
}
//# sourceMappingURL=encryptLetters.js.map