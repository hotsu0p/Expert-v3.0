"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
/**
 * The simplest implementation of an event emitter.
 */
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.l = [];
    }
    Emitter.prototype.add = function (l) {
        this.l.push(l);
    };
    Emitter.prototype.emit = function (e) {
        this.l.forEach(function (l) { return l(e); });
    };
    Emitter.prototype.remove = function (l) {
        this.l = this.l.filter(function (a) { return a !== l; });
    };
    return Emitter;
}());
exports.Emitter = Emitter;
//# sourceMappingURL=event.js.map