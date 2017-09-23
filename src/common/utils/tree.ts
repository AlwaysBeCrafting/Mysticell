import {isBranch, Predicate, Tree} from "common/types";


const trim = <B, L>(tree: Tree<B, L>, shouldKeep: Predicate<Tree<B, L>>): Tree<B, L> => (
	isBranch(tree)
		? {
			value: tree.value,
			children: tree.children
				.filter(shouldKeep)
				.map(child => trim(child, shouldKeep)),
		}
		: tree
);

const collapse = <B, L>(tree: Tree<B, L>, isExpanded: Predicate<Tree<B, L>>): Tree<B, L> => (
	isBranch(tree)
		? {
			value: tree.value,
			children: isExpanded(tree)
				? tree.children.map(child => collapse(child, isExpanded))
				: [],
		}
		: tree
);

const map = <B, L, Bm, Lm>(
	tree: Tree<B, L>,
	mapBranch: (x: B) => Bm,
	mapLeaf: (x: L) => Lm,
): Tree<Bm, Lm> => (
	isBranch(tree)
		? {
			value: mapBranch(tree.value),
			children: tree.children
				.map(child => map(child, mapBranch, mapLeaf)),
		}
		: {
			value: mapLeaf(tree.value),
		}
);

const mapBranches = <B, L, Bm>(tree: Tree<B, L>, mapFunc: (x: B) => Bm): Tree<Bm, L> => (
	map(tree, mapFunc, x => x)
);

const mapLeaves = <B, L, Lm>(tree: Tree<B, L>, mapFunc: (x: L) => Lm): Tree<B, Lm> => (
	map(tree, x => x, mapFunc)
);

type Comparator<T, U> = (t: T, u: U) => boolean;
type TreeComparator<B, L, P> = Comparator<Tree<B, L>, P>;
const eq: TreeComparator<any, any, any> = (t, p) => t.value === p;
const resolvePath = <B, L, P>(tree: Tree<B, L>, path: P[], compare: TreeComparator<B, L, P> = eq): Tree<B, L> => {
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


export {collapse, map, mapBranches, mapLeaves, resolvePath, trim};
