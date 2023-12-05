export function changeText(text: string, toInsert: { pos: number; toAdd?: string; toRemove?: string }[]): string {
  let s = text.split('')
  let indexIncr = 0
  toInsert.forEach(data => {
    data.toAdd = data.toAdd || ''
    data.toRemove = data.toRemove || ''
    s.splice(data.pos + indexIncr, data.toRemove.length, ...data.toAdd.split(''))
    indexIncr += data.toAdd.length - data.toRemove.length
  })
  return s.join('')
}
