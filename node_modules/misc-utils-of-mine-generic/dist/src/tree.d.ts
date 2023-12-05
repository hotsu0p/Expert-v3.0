/**
 * Tree traversal utilities using the simplest Tree Node representation. While traversing descendant nodes it support two modalities (child first / parent first) and several policies to break the iteration.
 *
 * TODO: test
 */
export interface Node {
    childNodes?: Node[];
    parentNode?: Node;
}
export declare function visitChildren<T extends Node>(n: T, v: (c: T) => void): void;
export declare function mapChildren<N extends Node, T>(n: N, v: (c: N) => T): T[];
export declare function findChildren<T extends Node>(n: T, p: NodePredicate<T>): T | undefined;
export declare function filterChildren<T extends Node>(n: Node, p: NodePredicate<T>): T[];
/**
 * @param getChildrenMode if true it will use `node.getChildren()` o obtain children instead of default
 * behavior that is using `node.forEachChild`.
 * @param children if caller already have called getChildren he can pass it here so this call is faster.
 */
export declare function getChildIndex(node: Node, children?: Node[] | undefined): number;
/**
 */
export declare function getNextSibling(node: Node): Node | undefined;
/**
 */
export declare function getSiblings(node: Node, getChildrenMode?: boolean): Node[];
/**
 */
export declare function getPreviousSibling(node: Node): Node | undefined;
export declare function visitAncestors<T extends Node>(n: T, v: Visitor<T>, o?: {}): boolean;
export declare function findAncestor<T extends Node>(n: T, p: NodePredicate<T>, o?: {}): T | undefined;
export declare function findRootElement<T extends Node>(n: T): T | undefined;
export declare function filterAncestors<T extends Node = Node>(n: T, p: NodeSimplePredicate<T>, o?: VisitorOptions): T[];
export declare type Visitor<T extends Node> = (n: T) => boolean;
/**
 * settings for visitDescendants regarding visiting order and visit interruption modes.
 */
export interface VisitorOptions {
    childrenFirst?: boolean;
    /**
     * if a descendant visitor returned true, we stop visiting and signal up
     */
    breakOnDescendantSignal?: boolean;
    /**
     * no matter if visitor returns true for a node, it will still visit its descendants and then break the chain
     */
    visitDescendantsOnSelfSignalAnyway?: boolean;
    andSelf?: boolean;
}
/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first
 * different modes on which visiting the rest of descenda|nts or Ancestors are configurable through the
 * options. By default, first the parent is evaluated which is configurable configurable with
 * [[[VisitorOptions.childrenFirst]]
 * */
export declare function visitDescendants<T extends Node>(n: T, v: Visitor<T>, o?: VisitorOptions, inRecursion?: boolean): boolean;
export declare type NodeSimplePredicate<T extends Node> = (n: T, i?: number, a?: T[]) => boolean;
export declare type NodeKindPredicate<T extends Node> = (n: T, i?: number, a?: T[]) => n is T;
export declare type NodePredicate<T extends Node> = NodeSimplePredicate<T> | (NodeKindPredicate<T>);
export declare function filterDescendants<T extends Node>(n: T, p: NodePredicate<T>, o?: VisitorOptions): T[];
export declare function mapDescendants<T extends Node, V = any>(n: T, p: (p: T) => V, o?: VisitorOptions): V[];
export declare function findDescendant<T extends Node>(n: T, p: NodePredicate<T>, o?: VisitorOptions): T | undefined;
/**
 * Gets given node's Ancestors in order from node.parent to top most one .
 */
export declare function getAncestors<T extends Node>(node: T | undefined): T[];
/**
 * Get the distance from given node to its Ancestor .
 */
export declare function getDistanceToAncestor<T extends Node>(node?: T, ancestor?: T): number;
