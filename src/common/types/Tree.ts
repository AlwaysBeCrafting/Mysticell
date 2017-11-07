import { List, Map, Record, ValueObject } from "immutable";

type TreeValue = ValueObject | number | string | boolean;

interface TreeProps<T extends TreeValue> {
  value: T;
  children: Map<T, Tree<T>>;
}
interface TreeMethods<T extends TreeValue> {
  getSubtree(path: T[]): Tree<T> | undefined;
  addItem(path: T[], children?: Map<T, Tree<T>>): this;
  hasItem(path: T[]): boolean;
  removeItem(path: T[]): this;
  moveItem(oldPath: T[], newPath: T[]): this;
}
class UntypedTree<T extends TreeValue> extends Record<TreeProps<any>>({
  value: undefined!,
  children: Map(),
}) implements TreeMethods<T> {
  hasItem(path: T[] = []): boolean {
    if (path.length === 0) {
      return true;
    }
    const child = this.children.get(path[0]);
    return !!child && child.hasItem(path.slice(1));
  }

  getSubtree(path: T[]): Tree<T> | undefined {
    if (path.length === 0) {
      return this;
    }
    return this.getIn(this.pathToList(path));
  }

  addItem(path: T[], children?: Map<T, Tree<T>>): this {
    const value = path[path.length - 1];
    return this.setIn(
      this.pathToList(path).push("children", value),
      Tree({ value, children }),
    );
  }

  removeItem(path: T[]): this {
    return this.removeIn(this.pathToList(path));
  }

  moveItem(oldPath: T[], newPath: T[]): this {
    const oldSubtree = this.getSubtree(oldPath);
    if (!oldSubtree) {
      return this;
    }
    return this.addItem(newPath, oldSubtree.children).removeItem(oldPath);
  }

  private pathToList(path: T[]): List<T | "children"> {
    return List<T | "children">(path)
      .interpose("children")
      .unshift("children");
  }
}
type Tree<T extends TreeValue> = TreeMethods<T> &
  Readonly<TreeProps<T>> &
  Record<TreeProps<T>>;
function Tree<T extends TreeValue>(values?: Partial<TreeProps<T>>): Tree<T> {
  return new UntypedTree(values);
}

export { Tree };
