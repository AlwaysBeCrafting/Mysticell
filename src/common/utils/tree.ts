import { isBranch, isLeaf, Tree } from "common/types";

type CollapseCallback<B, L> = (tree: Tree<B, L>, path: B[]) => boolean;

const collapse = <B, L>(
  tree: Tree<B, L>,
  isExpanded: CollapseCallback<B, L>,
  path: B[] = [],
): Tree<B, L> => {
  if (isLeaf(tree)) {
    return tree;
  }
  const collapseChild = (child: Tree<B, L>): Tree<B, L> =>
    collapse(child, isExpanded, [...path, tree.value]);
  return {
    value: tree.value,
    children: isExpanded(tree, path) ? tree.children.map(collapseChild) : [],
  };
};

const map = <B, L, Bm, Lm>(
  tree: Tree<B, L>,
  mapBranch: (branch: B, path: B[]) => Bm,
  mapLeaf: (leaf: L, path: B[]) => Lm,
  path: B[] = [],
): Tree<Bm, Lm> => {
  if (isBranch(tree)) {
    const compositeMap = [...path, tree.value];
    return {
      value: mapBranch(tree.value, path),
      children: tree.children.map(child =>
        map(child, mapBranch, mapLeaf, compositeMap),
      ),
    };
  } else {
    return {
      value: mapLeaf(tree.value, path),
    };
  }
};

const mapBranches = <B, L, Bm>(
  tree: Tree<B, L>,
  mapFunc: (x: B) => Bm,
): Tree<Bm, L> => map(tree, mapFunc, x => x);

const mapLeaves = <B, L, Lm>(
  tree: Tree<B, L>,
  mapFunc: (x: L) => Lm,
): Tree<B, Lm> => map(tree, x => x, mapFunc);

type Comparator<T, U> = (t: T, u: U) => boolean;
type TreeComparator<B, L, P> = Comparator<Tree<B, L>, P>;
const eq: TreeComparator<any, any, any> = (t, p) => t.value === p;
const resolvePath = <B, L, P>(
  tree: Tree<B, L>,
  path: P[],
  compare: TreeComparator<B, L, P> = eq,
): Tree<B, L> => {
  if (!path.length) {
    return tree;
  }
  if (isBranch(tree)) {
    const child = tree.children.find(ch => compare(ch, path[0]));
    if (child) {
      return resolvePath(child, path.slice(1), compare);
    }
  }
  throw new Error(`Path ${path} does not exist in tree ${tree}`);
};

export { collapse, map, mapBranches, mapLeaves, resolvePath };
