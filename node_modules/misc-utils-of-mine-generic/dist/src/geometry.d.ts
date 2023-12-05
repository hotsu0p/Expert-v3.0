export interface IPoint {
    x: number;
    y: number;
}
export interface IRect extends IPoint {
    width: number;
    height: number;
}
export declare function pointInside(p: IPoint, viewport: IRect): boolean;
declare type NumberMapFn = (n: number) => number;
/**
 * Simple Point class.
 *
 * Any method that takes an x and y may also take a point.
 */
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    clone(): Point;
    set(x: number, y: number): this;
    equals(x: number, y: number): boolean;
    toString(): string;
    map(f: NumberMapFn): this;
    add(x: number, y: number): this;
    subtract(x: number, y: number): this;
    scale(s: number): this;
    isZero(): boolean;
}
/**
 * Rect is a simple data structure for representation of a rectangle supporting
 * many basic geometric operations.
 *
 * NOTE: Since its operations are closed, rectangles may be empty and will report
 * non-positive widths and heights in that case.
 */
export declare class Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    get width(): number;
    set width(v: number);
    get height(): number;
    set height(v: number);
    isEmpty(): boolean;
    setRect(x: number, y: number, w: number, h: number): this;
    setBounds(l: number, t: number, r: number, b: number): this;
    equals(other?: Rect): boolean | undefined;
    clone(): Rect;
    center(): Point;
    copyFrom(other: Rect): this;
    translate(x: number, y: number): this;
    toString(): string;
    /**
     * Return a new rect that is the union of that one and this one
     */
    union(other: Rect): Rect;
    contains(other: Rect): boolean;
    intersect(other: Rect): Rect;
    intersects(other: Rect): boolean;
    /**
     * Restrict area of this rectangle to the intersection of both rectangles.
     */
    restrictTo(other: Rect): this;
    /**
     * Expand this rectangle to the union of both rectangles.
     */
    expandToContain(other: Rect): this;
    /**
     * Expands to the smallest rectangle that contains original rectangle and is bounded
     * by lines with integer coefficients.
     */
    round(): this;
    scale(xscl: number, yscl: number): this;
    map(f: NumberMapFn): this;
    /**
     * Ensure this rectangle is inside the other, if possible. Preserves w, h.
     */
    translateInside(other: Rect): this;
    /**
     * Subtract other area from this. Returns array of rects whose union is this-other.
     */
    subtract(other: Rect): Rect[];
    /**
     * Blends two rectangles together.
     * @param rect Rectangle to blend this one with
     * @param scalar Ratio from 0 (returns a clone of this rect) to 1 (clone of rect).
     * @return New blended rectangle.
     */
    blend(rect: Rect, scalar: number): Rect;
    /**
     * Grows or shrinks the rectangle while keeping the center point.
     * Accepts single multipler, or separate for both axes.
     */
    inflate(xscl: number, yscl: number): this;
    /**
     * Grows or shrinks the rectangle by fixed amount while keeping the center point.
     * Accepts single fixed amount
     */
    inflateFixed(fixed: number): this;
}
export {};
