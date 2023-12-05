import { changeText } from '../..'
describe('changeText', () => {
  it('add only', () => {
    const s = `hello how are you? I hope you are fine`
    const s2 = changeText(s, [{ pos: 5, toAdd: ' seba' }, { pos: 17, toAdd: ' today' }, { pos: 33, toAdd: ' really' }])
    expect(s2).toBe('hello seba how are you today? I hope you are really fine')
  })
  it('remove only', () => {
    const s = `hello how are you? I hope you are fine`
    const s2 = changeText(s, [{ pos: 6, toRemove: 'how ' }, { pos: 20, toRemove: 'hope ' }])
    debugger
    expect(s2).toBe('hello are you? I you are fine')
  })
  it('remove and add', () => {
    const s = `hello how are you? I hope you are fine`
    const s2 = changeText(s, [
      { pos: 6, toRemove: 'how ', toAdd: 'cómo ' },
      { pos: 21, toRemove: 'hope ', toAdd: 'think ' }
    ])
    expect(s2).toBe('hello cómo are you? I think you are fine')
  })
})
