interface EncryptLettersConfig {
    input: string;
    /** array of integers, each of them will be randomize each char of the input so it needs to be the same length as input */
    password: number[];
    /** the valid set of charts for encoding/decoding */
    universe: string;
}
/**
 * returns config.input encrypted digit by digit with given password and universe.
 * input and password must be contained in universe and have same length.
 * each number in the password is used to encrypt the corresponding input digit
 */
export declare function encryptLetters(config: EncryptLettersConfig): string;
/**
 * returns config.input decrypted digit by digit with given password and universe.
 * input and password must be contained in universe and have same length.
 * each number in the password is used to encrypt the corresponding input digit
 */
export declare function decryptLetters(config: EncryptLettersConfig): string;
export {};
