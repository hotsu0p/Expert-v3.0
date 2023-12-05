"use strict";
/**
 * Tree traversal utilities using the simplest Tree Node representation. While traversing descendant nodes it support two modalities (child first / parent first) and several policies to break the iteration.
 *
 * TODO: test
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceToAncestor = exports.getAncestors = exports.findDescendant = exports.mapDescendants = exports.filterDescendants = exports.visitDescendants = exports.filterAncestors = exports.findRootElement = exports.findAncestor = exports.visitAncestors = exports.getPreviousSibling = exports.getSiblings = exports.getNextSibling = exports.getChildIndex = exports.filterChildren = exports.findChildren = exports.mapChildren = exports.visitChildren = void 0;
function visitChildren(n, v) {
    v(n);
    (n.childNodes || []).forEach(function (c) { return visitChildren(c, v); });
}
exports.visitChildren = visitChildren;
function mapChildren(n, v) {
    var o = [];
    visitChildren(n, function (c) { return o.push(v(c)); });
    return o;
}
exports.mapChildren = mapChildren;
function findChildren(n, p) {
    return (n.childNodes || []).find(p);
}
exports.findChildren = findChildren;
function filterChildren(n, p) {
    return (n.childNodes || []).filter(function (c) { return p(c); });
}
exports.filterChildren = filterChildren;
/**
 * @param getChildrenMode if true it will use `node.getChildren()` o obtain children instead of default
 * behavior that is using `node.forEachChild`.
 * @param children if caller already have called getChildren he can pass it here so this call is faster.
 */
function getChildIndex(node, children) {
    if (children === void 0) { children = undefined; }
    var result = -1;
    node.parentNode && (children || (node.parentNode ? (node.parentNode.childNodes || []) : [])).find(function (c, i) {
        if (c === node) {
            result = i;
            return true;
        }
        return false;
    });
    return result;
}
exports.getChildIndex = getChildIndex;
/**
 */
function getNextSibling(node) {
    var index = getChildIndex(node, node.childNodes);
    return node.parentNode && index < (node.childNodes || []).length - 1 ? (node.childNodes || [])[index + 1] : undefined;
}
exports.getNextSibling = getNextSibling;
/**
 */
function getSiblings(node, getChildrenMode) {
    if (getChildrenMode === void 0) { getChildrenMode = false; }
    return node.parentNode ? (node.parentNode.childNodes || []).filter(function (c) { return c !== node; }) : [];
}
exports.getSiblings = getSiblings;
/**
 */
function getPreviousSibling(node) {
    var index = getChildIndex(node, node.childNodes);
    return index > 0 && node.parentNode ? (node.childNodes || [])[index - 1] : undefined;
}
exports.getPreviousSibling = getPreviousSibling;
function visitAncestors(n, v, o) {
    if (o === void 0) { o = {}; }
    return !n || v(n) || !n.parentNode || visitAncestors(n.parentNode, v, o);
}
exports.visitAncestors = visitAncestors;
function findAncestor(n, p, o) {
    if (o === void 0) { o = {}; }
    var a;
    visitAncestors(n, function (c) {
        if (p(c)) {
            a = c;
            return true;
        }
        return false;
    }, o);
    return a;
}
exports.findAncestor = findAncestor;
function findRootElement(n) {
    return !n ? undefined : !n.parentNode ? n : findAncestor(n.parentNode, function (p) { return !p.parentNode; });
}
exports.findRootElement = findRootElement;
function filterAncestors(n, p, o) {
    if (o === void 0) { o = {}; }
    var a = [];
    visitAncestors(n, function (c) {
        if (p(c)) {
            a.push(c);
        }
        return false;
    });
    return a;
}
exports.filterAncestors = filterAncestors;
/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first
 * different modes on which visiting the rest of descenda|nts or Ancestors are configurable through the
 * options. By default, first the parent is evaluated which is configurable configurable with
 * [[[VisitorOptions.childrenFirst]]
 * */
function visitDescendants(n, v, o, inRecursion) {
    if (o === void 0) { o = {}; }
    if (inRecursion === void 0) { inRecursion = false; }
    var r = false;
    if (o.childrenFirst) {
        r = (n.childNodes || []).some(function (c) { return visitDescendants(c, v, o, true); });
        if (r) {
            if (!o.breakOnDescendantSignal && (o.andSelf || inRecursion)) {
                v(n);
            }
            return true;
        }
        else if (o.andSelf || inRecursion) {
            r = v(n);
        }
        return false;
    }
    else {
        if (o.andSelf || inRecursion) {
            r = v(n);
        }
        if (r) {
            if (!o.visitDescendantsOnSelfSignalAnyway) {
                return true;
            }
            else {
                return (n.childNodes || []).some(function (c) { return visitDescendants(c, v, o, true); }) || true; // true because self was signaled
            }
        }
        else {
            return (n.childNodes || []).some(function (c) { return visitDescendants(c, v, o, true); });
        }
    }
}
exports.visitDescendants = visitDescendants;
function filterDescendants(n, p, o) {
    if (o === void 0) { o = {}; }
    var a = [];
    visitDescendants(n, function (c) {
        if (p(c)) {
            a.push(c);
        }
        return false;
    }, o);
    return a;
}
exports.filterDescendants = filterDescendants;
function mapDescendants(n, p, o) {
    if (o === void 0) { o = {}; }
    var a = [];
    visitDescendants(n, function (c) {
        a.push(p(c));
        return false;
    }, o);
    return a;
}
exports.mapDescendants = mapDescendants;
function findDescendant(n, p, o) {
    if (o === void 0) { o = {}; }
    var a;
    visitDescendants(n, function (c) {
        if (p(c)) {
            a = c;
            return true;
        }
        return false;
    }, o);
    return a;
}
exports.findDescendant = findDescendant;
/**
 * Gets given node's Ancestors in order from node.parent to top most one .
 */
function getAncestors(node) {
    var a = node;
    var result = [];
    while (a && (a = a.parentNode)) {
        result.push(a);
    }
    return result;
}
exports.getAncestors = getAncestors;
/**
 * Get the distance from given node to its Ancestor .
 */
function getDistanceToAncestor(node, ancestor) {
    if (node === ancestor || !node || !ancestor) {
        return 0;
    }
    else {
        return getDistanceToAncestor(node.parentNode, ancestor) + 1;
    }
}
exports.getDistanceToAncestor = getDistanceToAncestor;
//# sourceMappingURL=tree.js.map