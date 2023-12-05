/**
 * Tree traversal utilities using the simplest Tree Node representation. While traversing descendant nodes it support two modalities (child first / parent first) and several policies to break the iteration. 
 * 
 * TODO: test
 */

export interface Node {
  childNodes?: Node[]
  parentNode?: Node
}

export function visitChildren<T extends Node>(n: T, v: (c: T) => void) {
  v(n);
  (n.childNodes || []).forEach(c => visitChildren(c as any, v))
}

export function mapChildren<N extends Node, T>(n: N, v: (c: N) => T): T[] {
  const o: T[] = []
  visitChildren(n, c => o.push(v(c)))
  return o
}

export function findChildren<T extends Node>(n: T, p: NodePredicate<T>): T | undefined {
  return (n.childNodes as T[] || []).find(p) as any
}

export function filterChildren<T extends Node>(n: Node, p: NodePredicate<T>): T[] {
  return (n.childNodes as T[] || []).filter(c => p(c)) as any
}

/**
 * @param getChildrenMode if true it will use `node.getChildren()` o obtain children instead of default
 * behavior that is using `node.forEachChild`.
 * @param children if caller already have called getChildren he can pass it here so this call is faster.
 */
export function getChildIndex(node: Node, children: Node[] | undefined = undefined): number {
  let result = -1
  node.parentNode && (children || (node.parentNode ? (node.parentNode.childNodes || []) : [])).find((c, i) => {
    if (c === node) {
      result = i
      return true
    }
    return false
  })
  return result
}

/**
 */
export function getNextSibling(node: Node): Node | undefined {
  const index = getChildIndex(node, node.childNodes)
  return node.parentNode && index < (node.childNodes || []).length - 1 ? (node.childNodes || [])[index + 1] : undefined
}

/**
 */
export function getSiblings(node: Node, getChildrenMode: boolean = false): Node[] {
  return node.parentNode ? (node.parentNode.childNodes || []).filter(c => c !== node) : []
}

/**
 */
export function getPreviousSibling(node: Node): Node | undefined {
  const index = getChildIndex(node, node.childNodes)
  return index > 0 && node.parentNode ? (node.childNodes || [])[index - 1] : undefined
}

export function visitAncestors<T extends Node>(n: T, v: Visitor<T>, o = {}): boolean {
  return !n || v(n) || !n.parentNode || visitAncestors(n.parentNode as T, v, o)
}

export function findAncestor<T extends Node>(n: T, p: NodePredicate<T>, o = {}): T | undefined {
  let a: T | undefined
  visitAncestors(
    n,
    c => {
      if (p(c)) {
        a = c
        return true
      }
      return false
    },
    o
  )
  return a
}

export function findRootElement<T extends Node>(n: T) {
  return !n ? undefined : !n.parentNode ? n : findAncestor(n.parentNode, p => !p.parentNode) as T | undefined
}

export function filterAncestors<T extends Node = Node>(n: T, p: NodeSimplePredicate<T>, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitAncestors(n, c => {
    if (p(c)) {
      a.push(c as T)
    }
    return false
  })
  return a
}

export type Visitor<T extends Node> = (n: T) => boolean

/**
 * settings for visitDescendants regarding visiting order and visit interruption modes.
 */
export interface VisitorOptions {
  childrenFirst?: boolean
  /**
   * if a descendant visitor returned true, we stop visiting and signal up
   */
  breakOnDescendantSignal?: boolean
  /**
   * no matter if visitor returns true for a node, it will still visit its descendants and then break the chain
   */
  visitDescendantsOnSelfSignalAnyway?: boolean
  andSelf?: boolean
}

/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first
 * different modes on which visiting the rest of descenda|nts or Ancestors are configurable through the
 * options. By default, first the parent is evaluated which is configurable configurable with
 * [[[VisitorOptions.childrenFirst]]
 * */
export function visitDescendants<T extends Node>(n: T, v: Visitor<T>, o: VisitorOptions = {}, inRecursion = false): boolean {
  let r = false
  if (o.childrenFirst) {
    r = ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true))
    if (r) {
      if (!o.breakOnDescendantSignal && (o.andSelf || inRecursion)) {
        v(n)
      }
      return true
    } else if (o.andSelf || inRecursion) {
      r = v(n)
    }
    return false
  } else {
    if (o.andSelf || inRecursion) {
      r = v(n)
    }
    if (r) {
      if (!o.visitDescendantsOnSelfSignalAnyway) {
        return true
      } else {
        return ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true)) || true // true because self was signaled
      }
    } else {
      return ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true))
    }
  }
}

export type NodeSimplePredicate<T extends Node> = (n: T, i?: number, a?: T[]) => boolean

export type NodeKindPredicate<T extends Node> = (n: T, i?: number, a?: T[]) => n is T

export type NodePredicate<T extends Node> = NodeSimplePredicate<T> | (NodeKindPredicate<T>)

export function filterDescendants<T extends Node>(n: T, p: NodePredicate<T>, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitDescendants<T>(
    n,
    c => {
      if (p(c)) {
        a.push(c)
      }
      return false
    },
    o
  )
  return a
}

export function mapDescendants<T extends Node, V = any>(n: T, p: (p: T) => V, o: VisitorOptions = {}): V[] {
  const a: V[] = []
  visitDescendants(
    n,
    c => {
      a.push(p(c as any))
      return false
    },
    o
  )
  return a
}

export function findDescendant<T extends Node>(n: T, p: NodePredicate<T>, o: VisitorOptions = {}): T | undefined {
  let a: T | undefined
  visitDescendants(
    n,
    c => {
      if (p(c)) {
        a = c
        return true
      }
      return false
    },
    o
  )
  return a
}
/** 
 * Gets given node's Ancestors in order from node.parent to top most one .
 */
export function getAncestors<T extends Node>(node: T | undefined): T[] {
  let a = node
  const result: T[] = []
  while (a && (a = a.parentNode as T | undefined)) {
    result.push(a)
  }
  return result
}

/**
 * Get the distance from given node to its Ancestor .
 */
export function getDistanceToAncestor<T extends Node>(node?: T, ancestor?: T): number {
  if (node === ancestor || !node || !ancestor) {
    return 0
  }
  else {
    return getDistanceToAncestor(node.parentNode, ancestor) + 1
  }
}
