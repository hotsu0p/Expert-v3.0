"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = exports.Point = exports.pointInside = void 0;
function pointInside(p, viewport) {
    return p.x >= viewport.x && p.y >= viewport.y && p.x <= viewport.x + viewport.width && p.y <= viewport.y + viewport.height;
}
exports.pointInside = pointInside;
/**
 * Simple Point class.
 *
 * Any method that takes an x and y may also take a point.
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.set(x, y);
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    Point.prototype.equals = function (x, y) {
        return this.x == x && this.y == y;
    };
    Point.prototype.toString = function () {
        return '(' + this.x + ',' + this.y + ')';
    };
    Point.prototype.map = function (f) {
        this.x = f(this.x);
        this.y = f(this.y);
        return this;
    };
    Point.prototype.add = function (x, y) {
        this.x += x;
        this.y += y;
        return this;
    };
    Point.prototype.subtract = function (x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    };
    Point.prototype.scale = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    Point.prototype.isZero = function () {
        return this.x === 0 && this.y == 0;
    };
    return Point;
}());
exports.Point = Point;
/**
 * Rect is a simple data structure for representation of a rectangle supporting
 * many basic geometric operations.
 *
 * NOTE: Since its operations are closed, rectangles may be empty and will report
 * non-positive widths and heights in that case.
 */
var Rect = /** @class */ (function () {
    function Rect(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Object.defineProperty(Rect.prototype, "x", {
        get: function () {
            return this.left;
        },
        set: function (v) {
            var diff = this.left - v;
            this.left = v;
            this.right -= diff;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "y", {
        get: function () {
            return this.top;
        },
        set: function (v) {
            var diff = this.top - v;
            this.top = v;
            this.bottom -= diff;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        set: function (v) {
            this.right = this.left + v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.bottom - this.top;
        },
        set: function (v) {
            this.bottom = this.top + v;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.isEmpty = function () {
        return this.left >= this.right || this.top >= this.bottom;
    };
    Rect.prototype.setRect = function (x, y, w, h) {
        this.left = x;
        this.top = y;
        this.right = x + w;
        this.bottom = y + h;
        return this;
    };
    Rect.prototype.setBounds = function (l, t, r, b) {
        this.top = t;
        this.left = l;
        this.bottom = b;
        this.right = r;
        return this;
    };
    Rect.prototype.equals = function (other) {
        return (other &&
            ((this.isEmpty() && other.isEmpty()) ||
                (this.top == other.top && this.left == other.left && this.bottom == other.bottom && this.right == other.right)));
    };
    Rect.prototype.clone = function () {
        return new Rect(this.left, this.top, this.right - this.left, this.bottom - this.top);
    };
    Rect.prototype.center = function () {
        if (this.isEmpty()) {
            throw new Error('Empty rectangles do not have centers');
        }
        return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);
    };
    Rect.prototype.copyFrom = function (other) {
        this.top = other.top;
        this.left = other.left;
        this.bottom = other.bottom;
        this.right = other.right;
        return this;
    };
    Rect.prototype.translate = function (x, y) {
        this.left += x;
        this.right += x;
        this.top += y;
        this.bottom += y;
        return this;
    };
    Rect.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + ',' + this.width + ',' + this.height + ']';
    };
    /**
     * Return a new rect that is the union of that one and this one
     */
    Rect.prototype.union = function (other) {
        return this.clone().expandToContain(other);
    };
    Rect.prototype.contains = function (other) {
        if (other.isEmpty())
            return true;
        if (this.isEmpty())
            return false;
        return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom;
    };
    Rect.prototype.intersect = function (other) {
        return this.clone().restrictTo(other);
    };
    Rect.prototype.intersects = function (other) {
        if (this.isEmpty() || other.isEmpty()) {
            return false;
        }
        var x1 = Math.max(this.left, other.left);
        var x2 = Math.min(this.right, other.right);
        var y1 = Math.max(this.top, other.top);
        var y2 = Math.min(this.bottom, other.bottom);
        return x1 < x2 && y1 < y2;
    };
    /**
     * Restrict area of this rectangle to the intersection of both rectangles.
     */
    Rect.prototype.restrictTo = function (other) {
        if (this.isEmpty() || other.isEmpty()) {
            return this.setRect(0, 0, 0, 0);
        }
        var x1 = Math.max(this.left, other.left);
        var x2 = Math.min(this.right, other.right);
        var y1 = Math.max(this.top, other.top);
        var y2 = Math.min(this.bottom, other.bottom);
        // If width or height is 0, the intersection was empty.
        return this.setRect(x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1));
    };
    /**
     * Expand this rectangle to the union of both rectangles.
     */
    Rect.prototype.expandToContain = function (other) {
        if (this.isEmpty()) {
            return this.copyFrom(other);
        }
        if (other.isEmpty()) {
            return this;
        }
        var l = Math.min(this.left, other.left);
        var r = Math.max(this.right, other.right);
        var t = Math.min(this.top, other.top);
        var b = Math.max(this.bottom, other.bottom);
        return this.setRect(l, t, r - l, b - t);
    };
    /**
     * Expands to the smallest rectangle that contains original rectangle and is bounded
     * by lines with integer coefficients.
     */
    Rect.prototype.round = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        return this;
    };
    Rect.prototype.scale = function (xscl, yscl) {
        this.left *= xscl;
        this.right *= xscl;
        this.top *= yscl;
        this.bottom *= yscl;
        return this;
    };
    Rect.prototype.map = function (f) {
        this.left = f(this.left);
        this.top = f(this.top);
        this.right = f(this.right);
        this.bottom = f(this.bottom);
        return this;
    };
    /**
     * Ensure this rectangle is inside the other, if possible. Preserves w, h.
     */
    Rect.prototype.translateInside = function (other) {
        var offsetX = 0;
        if (this.left <= other.left) {
            offsetX = other.left - this.left;
        }
        else if (this.right > other.right) {
            offsetX = other.right - this.right;
        }
        var offsetY = 0;
        if (this.top <= other.top) {
            offsetY = other.top - this.top;
        }
        else if (this.bottom > other.bottom) {
            offsetY = other.bottom - this.bottom;
        }
        return this.translate(offsetX, offsetY);
    };
    /**
     * Subtract other area from this. Returns array of rects whose union is this-other.
     */
    Rect.prototype.subtract = function (other) {
        var r = new Rect(0, 0, 0, 0);
        var result = [];
        other = other.intersect(this);
        if (other.isEmpty()) {
            return [this.clone()];
        }
        // left strip
        r.setBounds(this.left, this.top, other.left, this.bottom);
        if (!r.isEmpty()) {
            result.push(r.clone());
        }
        // inside strip
        r.setBounds(other.left, this.top, other.right, other.top);
        if (!r.isEmpty()) {
            result.push(r.clone());
        }
        r.setBounds(other.left, other.bottom, other.right, this.bottom);
        if (!r.isEmpty()) {
            result.push(r.clone());
        }
        // right strip
        r.setBounds(other.right, this.top, this.right, this.bottom);
        if (!r.isEmpty()) {
            result.push(r.clone());
        }
        return result;
    };
    /**
     * Blends two rectangles together.
     * @param rect Rectangle to blend this one with
     * @param scalar Ratio from 0 (returns a clone of this rect) to 1 (clone of rect).
     * @return New blended rectangle.
     */
    Rect.prototype.blend = function (rect, scalar) {
        return new Rect(this.left + (rect.left - this.left) * scalar, this.top + (rect.top - this.top) * scalar, this.width + (rect.width - this.width) * scalar, this.height + (rect.height - this.height) * scalar);
    };
    /**
     * Grows or shrinks the rectangle while keeping the center point.
     * Accepts single multipler, or separate for both axes.
     */
    Rect.prototype.inflate = function (xscl, yscl) {
        var xAdj = (this.width * xscl - this.width) / 2;
        var s = arguments.length > 1 ? yscl : xscl;
        var yAdj = (this.height * s - this.height) / 2;
        this.left -= xAdj;
        this.right += xAdj;
        this.top -= yAdj;
        this.bottom += yAdj;
        return this;
    };
    /**
     * Grows or shrinks the rectangle by fixed amount while keeping the center point.
     * Accepts single fixed amount
     */
    Rect.prototype.inflateFixed = function (fixed) {
        this.left -= fixed;
        this.right += fixed;
        this.top -= fixed;
        this.bottom += fixed;
        return this;
    };
    return Rect;
}());
exports.Rect = Rect;
//# sourceMappingURL=geometry.js.map