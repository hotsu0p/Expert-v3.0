/**
 * The simplest implementation of an event emitter.
 */
export class Emitter<E = any, L extends Listener<E> = Listener<E>> {
  private l: L[] = []
  add(l: L) {
    this.l.push(l)
  }
  emit(e: E) {
    this.l.forEach(l => l(e))
  }
  remove(l: L) {
    this.l = this.l.filter(a => a !== l)
  }
}
type Listener<E> = (e: E) => void
