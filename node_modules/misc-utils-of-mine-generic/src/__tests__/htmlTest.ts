import { htmlElement } from '..'

describe('html', () => {
  it('basename', () => {
    let s = htmlElement({
      name: 'a',
      attributes: [{ name: 'href', value: 'foo.com' }, { name: 'id', value: 'clickMe' }],
      innerHTML: 'click me'
    })
    expect(s).toBe('<a href="foo.com" id="clickMe">click me</a>')

    s = htmlElement({
      name: 'div',
      attributes: [{ name: 'class', value: 'container' }],
      children: [
        {
          name: 'a',
          attributes: [{ name: 'href', value: 'foo.com' }, { name: 'id', value: 'clickMe' }],
          innerHTML: 'click me'
        }
      ],
    })
    expect(s).toBe('<div class="container"><a href="foo.com" id="clickMe">click me</a></div>')
  })
})
