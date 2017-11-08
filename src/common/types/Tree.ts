import { List, Map, Record, ValueObject } from "immutable";

type TreeKey = ValueObject | number | string | boolean;

interface TreeProps<K extends TreeKey, V> {
  value: V;
  children: Map<K, Tree<K, V>>;
}
interface TreeMethods<K extends TreeKey, V> {
  getSubtree(path: List<K>): this | undefined;
  setItem(path: List<K>, value: V, children?: Map<K, Tree<K, V>>): this;
  getItem(path: List<K>): V | undefined;
  hasItem(path: List<K>): boolean;
  removeItem(path: List<K>): this;
  moveItem(oldPath: List<K>, newPath: List<K>): this;
}
class UntypedTree<K extends TreeKey, V> extends Record<TreeProps<any, any>>({
  value: undefined!,
  children: Map(),
}) implements TreeMethods<K, V> {
  hasItem(path: List<K> = List()): boolean {
    if (path.isEmpty()) {
      return true;
    }
    const child = this.children.first();
    return !!child && child.hasItem(path.delete(0));
  }

  getSubtree(path: List<K>): this | undefined {
    if (path.isEmpty()) {
      return this;
    }
    return this.getIn(this.pathWithChildren(path));
  }

  setItem(path: List<K>, value: V, children?: Map<K, Tree<K, V>>): this {
    if (path.isEmpty()) {
      return this;
    }
    const childrenPath = this.pathWithChildren(path);
    const oldTree = (this.getIn(childrenPath) as Tree<K, V>) || Tree();
    return this.setIn(
      childrenPath,
      oldTree.set("value", value).set("children", children || oldTree.children),
    );
  }

  getItem(path: List<K>): V | undefined {
    const subtree = this.getSubtree(path);
    return subtree && subtree.value;
  }

  removeItem(path: List<K>): this {
    return this.removeIn(this.pathWithChildren(path));
  }

  moveItem(oldPath: List<K>, newPath: List<K>): this {
    const oldSubtree = this.getSubtree(oldPath);
    if (!oldSubtree) {
      return this;
    }
    return this.removeItem(oldPath).setItem(
      newPath,
      oldSubtree.value,
      oldSubtree.children,
    );
  }

  private pathWithChildren(path: List<K | "children">): List<K | "children"> {
    return path.interpose("children").unshift("children");
  }
}
type Tree<K extends TreeKey, V> = TreeMethods<K, V> &
  Readonly<TreeProps<K, V>> &
  Record<TreeProps<K, V>>;
function Tree<T extends TreeKey, V>(
  values?: Partial<TreeProps<T, V>>,
): Tree<T, V> {
  return new UntypedTree(values);
}

export { Tree, TreeKey };
