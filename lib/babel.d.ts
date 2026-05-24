declare module "@babel/traverse" {
  import type { Node } from "@babel/types"
  interface NodePath<T = Node> {
    node: T
    parent: Node
    traverse(visitors: Record<string, (path: NodePath) => void>): void
  }
  export default function traverse(
    ast: Node,
    visitors: Record<string, (path: NodePath) => void>
  ): void
  export type { NodePath }
}
