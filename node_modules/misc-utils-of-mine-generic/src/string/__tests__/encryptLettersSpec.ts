import { decryptLetters, encryptLetters } from '../encryptLetters'
describe('string/encryptLetters', () => {
  it('encryptLetters', () => {
    const text = '123abczy', password = [1, 2, 3, 4, 5, 6, 7, 8]
    const encrypted = encryptLetters({
      input: text,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(encrypted).toEqual('246exz77');

    const decrypted = decryptLetters({
      input: encrypted,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(decrypted).toEqual(text);
  })

  it('allows to use negative numbers in password', () => {
    const text = '123abczy', password = [-10, 2, 3, 4, 5, 6, 7, 8]
    const encrypted = encryptLetters({
      input: text,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(encrypted).toEqual('046exz77');

    const decrypted = decryptLetters({
      input: encrypted,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(decrypted).toEqual(text);
  })

  it('allows to use a password with more length than input\'s', () => {
    const text = '123abczy', password = [-10, -222, 63, 40, -5, 6, -71, -85, 12, -12, 11, -3, 4]
    const encrypted = encryptLetters({
      input: text,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(encrypted).toEqual('089c7z59');

    const decrypted = decryptLetters({
      input: encrypted,
      universe: '1234567890abcdefxyz',
      password,
    })
    expect(decrypted).toEqual(text);
  })
})
