"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = exports.asyncMap = exports.asyncForEach = exports.serial = void 0;
/**
 * Execute given functions returning promises serially. Returns a promise that resolves when all finish with they results as array.
 */
function serial(p) {
    return new Promise(function (resolve) {
        p.reduce(function (promiseChain, currentTask) {
            return promiseChain.then(function (chainResults) {
                return currentTask().then(function (currentResult) { return __spreadArrays(chainResults, [currentResult]); });
            });
        }, Promise.resolve([])).then(function (arrayOfResults) {
            resolve(arrayOfResults);
        });
    });
}
exports.serial = serial;
/** iterates serially */
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.asyncForEach = asyncForEach;
/** applies a map() serially */
function asyncMap(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    return [4 /*yield*/, asyncForEach(array, function (item, i, a) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = result).push;
                                        return [4 /*yield*/, callback(item, i, a)];
                                    case 1:
                                        _b.apply(_a, [_c.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.asyncMap = asyncMap;
/**
 * Promise like object that allows to resolve it promise from outside code. Example:
 *
```
class Api {
  fooReady = new Deferred<Data>()
  private knower() {
    inOtherMoment(data=>{
      this.fooReady.resolve(data)
    })
  }
}
```
 */
var Deferred = /** @class */ (function () {
    function Deferred(callback) {
        var instance = this;
        this.resolve = null;
        this.reject = null;
        this.status = 'pending';
        this.promise = new Promise(function (resolve, reject) {
            instance.resolve = function () { this.status = 'resolved'; resolve.apply(this, arguments); };
            instance.reject = function () { this.status = 'rejected'; reject.apply(this, arguments); };
        });
        if (typeof callback === 'function') {
            callback.call(this, this.resolve, this.reject);
        }
    }
    Deferred.prototype.then = function (resolve) {
        return this.promise.then(resolve);
    };
    Deferred.prototype.catch = function (r) {
        return this.promise.catch(r);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=promise.js.map