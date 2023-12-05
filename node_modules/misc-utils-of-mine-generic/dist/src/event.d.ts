/**
 * The simplest implementation of an event emitter.
 */
export declare class Emitter<E = any, L extends Listener<E> = Listener<E>> {
    private l;
    add(l: L): void;
    emit(e: E): void;
    remove(l: L): void;
}
declare type Listener<E> = (e: E) => void;
export {};
