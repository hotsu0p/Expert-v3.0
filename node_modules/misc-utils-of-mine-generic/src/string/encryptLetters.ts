interface EncryptLettersConfig {
  input: string,
  /** array of integers, each of them will be randomize each char of the input so it needs to be the same length as input */
  password: number[]
  /** the valid set of charts for encoding/decoding */
  universe: string
}

/** 
 * returns config.input encrypted digit by digit with given password and universe. 
 * input and password must be contained in universe and have same length. 
 * each number in the password is used to encrypt the corresponding input digit
 */
export function encryptLetters(config: EncryptLettersConfig): string {
  // TODO: check that input, output and password must be contained in universe
  // TODO: check that universe must not have repeated symbols. 
  if (config.password.length < config.input.length) {
    throw new Error(`password length must be same or greater than input's`)
  }
  const input = config.input.split('')
  const r = input.map((inputChar, inputIndex) => {
    const { universeIndex, delta } = preconditions(config, inputChar, inputIndex)
    let r = (universeIndex + delta) % config.universe.length
    if (r < 0) {
      r = config.universe.length + r
    }
    return config.universe[r]
  })
  return r.join('')
}

/** 
 * returns config.input decrypted digit by digit with given password and universe. 
 * input and password must be contained in universe and have same length. 
 * each number in the password is used to encrypt the corresponding input digit
 */
export function decryptLetters(config: EncryptLettersConfig): string {
  // TODO: check that input, output and password must be contained in universe
  // TODO: check that universe must not have repeated symbols. 
  if (config.password.length < config.input.length) {
    throw new Error(`password length must be same or greater than input's`)
  }
  const input = config.input.split('')
  const r = input.map((inputChar, inputIndex) => {
    const { universeIndex, delta } = preconditions(config, inputChar, inputIndex)
    let r = (universeIndex - delta) % config.universe.length
    if (r < 0) {
      r = config.universe.length + r
    }
    // console.log({ universeIndex, delta, universeLength: config.universe.length, result: r });
    return config.universe[r]
  })
  return r.join('')
}

function preconditions(config: EncryptLettersConfig, inputChar: string, inputIndex: number) {
  const universeIndex = config.universe.indexOf(inputChar)
  if (universeIndex === -1) {
    throw new Error(`input contains char "${inputChar}" that's not present in the universe`)
  }
  const delta = config.password[inputIndex]
  if (delta === -1) {
    throw new Error(`input contains char "${inputChar}" that's not present in the universe`)
  }
  return { universeIndex, delta }
}
