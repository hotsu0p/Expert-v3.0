export interface IPoint {
  x: number
  y: number
}
export interface IRect extends IPoint {
  width: number
  height: number
}

export function pointInside(p: IPoint, viewport: IRect) {
  return p.x >= viewport.x && p.y >= viewport.y && p.x <= viewport.x + viewport.width && p.y <= viewport.y + viewport.height
}



/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

type NumberMapFn = (n: number) => number

/**
 * Simple Point class.
 *
 * Any method that takes an x and y may also take a point.
 */
export class Point {
  constructor(public x: number, public y: number) {
    this.set(x, y)
  }
  clone() {
    return new Point(this.x, this.y)
  }

  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  equals(x: number, y: number) {
    return this.x == x && this.y == y
  }

  toString() {
    return '(' + this.x + ',' + this.y + ')'
  }

  map(f: NumberMapFn) {
    this.x = f(this.x)
    this.y = f(this.y)
    return this
  }

  add(x: number, y: number) {
    this.x += x
    this.y += y
    return this
  }

  subtract(x: number, y: number) {
    this.x -= x
    this.y -= y
    return this
  }

  scale(s: number) {
    this.x *= s
    this.y *= s
    return this
  }

  isZero() {
    return this.x === 0 && this.y == 0
  }
}

/**
 * Rect is a simple data structure for representation of a rectangle supporting
 * many basic geometric operations.
 *
 * NOTE: Since its operations are closed, rectangles may be empty and will report
 * non-positive widths and heights in that case.
 */
export class Rect {
  constructor(public left: number, public top: number, public right: number, public bottom: number) { }

  get x() {
    return this.left
  }

  set x(v: number) {
    const diff = this.left - v
    this.left = v
    this.right -= diff
  }

  get y() {
    return this.top
  }

  set y(v: number) {
    const diff = this.top - v
    this.top = v
    this.bottom -= diff
  }

  get width() {
    return this.right - this.left
  }

  set width(v) {
    this.right = this.left + v
  }

  get height() {
    return this.bottom - this.top
  }

  set height(v) {
    this.bottom = this.top + v
  }

  isEmpty() {
    return this.left >= this.right || this.top >= this.bottom
  }

  setRect(x: number, y: number, w: number, h: number) {
    this.left = x
    this.top = y
    this.right = x + w
    this.bottom = y + h
    return this
  }

  setBounds(l: number, t: number, r: number, b: number) {
    this.top = t
    this.left = l
    this.bottom = b
    this.right = r
    return this
  }

  equals(other?: Rect) {
    return (
      other &&
      ((this.isEmpty() && other.isEmpty()) ||
        (this.top == other.top && this.left == other.left && this.bottom == other.bottom && this.right == other.right))
    )
  }

  clone() {
    return new Rect(this.left, this.top, this.right - this.left, this.bottom - this.top)
  }

  center() {
    if (this.isEmpty()) {
      throw new Error('Empty rectangles do not have centers')
    }
    return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2)
  }

  copyFrom(other: Rect) {
    this.top = other.top
    this.left = other.left
    this.bottom = other.bottom
    this.right = other.right
    return this
  }

  translate(x: number, y: number) {
    this.left += x
    this.right += x
    this.top += y
    this.bottom += y
    return this
  }

  toString() {
    return '[' + this.x + ',' + this.y + ',' + this.width + ',' + this.height + ']'
  }

  /**
   * Return a new rect that is the union of that one and this one
   */
  union(other: Rect) {
    return this.clone().expandToContain(other)
  }

  contains(other: Rect) {
    if (other.isEmpty()) return true
    if (this.isEmpty()) return false
    return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom
  }

  intersect(other: Rect) {
    return this.clone().restrictTo(other)
  }

  intersects(other: Rect) {
    if (this.isEmpty() || other.isEmpty()) {
      return false
    }
    const x1 = Math.max(this.left, other.left)
    const x2 = Math.min(this.right, other.right)
    const y1 = Math.max(this.top, other.top)
    const y2 = Math.min(this.bottom, other.bottom)
    return x1 < x2 && y1 < y2
  }

  /**
   * Restrict area of this rectangle to the intersection of both rectangles.
   */
  restrictTo(other: Rect) {
    if (this.isEmpty() || other.isEmpty()) {
      return this.setRect(0, 0, 0, 0)
    }
    const x1 = Math.max(this.left, other.left)
    const x2 = Math.min(this.right, other.right)
    const y1 = Math.max(this.top, other.top)
    const y2 = Math.min(this.bottom, other.bottom)
    // If width or height is 0, the intersection was empty.
    return this.setRect(x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1))
  }

  /**
   * Expand this rectangle to the union of both rectangles.
   */
  expandToContain(other: Rect) {
    if (this.isEmpty()) {
      return this.copyFrom(other)
    }
    if (other.isEmpty()) {
      return this
    }
    const l = Math.min(this.left, other.left)
    const r = Math.max(this.right, other.right)
    const t = Math.min(this.top, other.top)
    const b = Math.max(this.bottom, other.bottom)
    return this.setRect(l, t, r - l, b - t)
  }

  /**
   * Expands to the smallest rectangle that contains original rectangle and is bounded
   * by lines with integer coefficients.
   */
  round() {
    this.left = Math.floor(this.left)
    this.top = Math.floor(this.top)
    this.right = Math.ceil(this.right)
    this.bottom = Math.ceil(this.bottom)
    return this
  }

  scale(xscl: number, yscl: number) {
    this.left *= xscl
    this.right *= xscl
    this.top *= yscl
    this.bottom *= yscl
    return this
  }

  map(f: NumberMapFn) {
    this.left = f(this.left)
    this.top = f(this.top)
    this.right = f(this.right)
    this.bottom = f(this.bottom)
    return this
  }

  /**
   * Ensure this rectangle is inside the other, if possible. Preserves w, h.
   */
  translateInside(other: Rect) {
    let offsetX = 0
    if (this.left <= other.left) {
      offsetX = other.left - this.left
    } else if (this.right > other.right) {
      offsetX = other.right - this.right
    }
    let offsetY = 0
    if (this.top <= other.top) {
      offsetY = other.top - this.top
    } else if (this.bottom > other.bottom) {
      offsetY = other.bottom - this.bottom
    }
    return this.translate(offsetX, offsetY)
  }

  /**
   * Subtract other area from this. Returns array of rects whose union is this-other.
   */
  subtract(other: Rect) {
    const r = new Rect(0, 0, 0, 0)
    const result = []
    other = other.intersect(this)
    if (other.isEmpty()) {
      return [this.clone()]
    }
    // left strip
    r.setBounds(this.left, this.top, other.left, this.bottom)
    if (!r.isEmpty()) {
      result.push(r.clone())
    }
    // inside strip
    r.setBounds(other.left, this.top, other.right, other.top)
    if (!r.isEmpty()) {
      result.push(r.clone())
    }
    r.setBounds(other.left, other.bottom, other.right, this.bottom)
    if (!r.isEmpty()) {
      result.push(r.clone())
    }
    // right strip
    r.setBounds(other.right, this.top, this.right, this.bottom)
    if (!r.isEmpty()) {
      result.push(r.clone())
    }
    return result
  }

  /**
   * Blends two rectangles together.
   * @param rect Rectangle to blend this one with
   * @param scalar Ratio from 0 (returns a clone of this rect) to 1 (clone of rect).
   * @return New blended rectangle.
   */
  blend(rect: Rect, scalar: number) {
    return new Rect(
      this.left + (rect.left - this.left) * scalar,
      this.top + (rect.top - this.top) * scalar,
      this.width + (rect.width - this.width) * scalar,
      this.height + (rect.height - this.height) * scalar
    )
  }

  /**
   * Grows or shrinks the rectangle while keeping the center point.
   * Accepts single multipler, or separate for both axes.
   */
  inflate(xscl: number, yscl: number) {
    const xAdj = (this.width * xscl - this.width) / 2
    const s = arguments.length > 1 ? yscl : xscl
    const yAdj = (this.height * s - this.height) / 2
    this.left -= xAdj
    this.right += xAdj
    this.top -= yAdj
    this.bottom += yAdj
    return this
  }

  /**
   * Grows or shrinks the rectangle by fixed amount while keeping the center point.
   * Accepts single fixed amount
   */
  inflateFixed(fixed: number) {
    this.left -= fixed
    this.right += fixed
    this.top -= fixed
    this.bottom += fixed
    return this
  }
}
