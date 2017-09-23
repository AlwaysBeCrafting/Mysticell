import {isBranch, Tree} from "common/types";

type TrimFunc = (tree: Tree<any>) => boolean;

const ident = x => x;

const trim = <B, L>(tree: Tree<B, L>, shouldKeep: TrimFunc): Tree<B, L> => {
	if (isBranch(tree)) {
		return {
			value: tree.value,
			children: tree.children
				.filter(shouldKeep)
				.map(child => trim(child, shouldKeep)),
		};
	}
	return tree;
};

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
	map(tree, mapFunc, ident)
);

const mapLeaves = <B, L, Lm>(tree: Tree<B, L>, mapFunc: (x: L) => Lm): Tree<B, Lm> => (
	map(tree, ident, mapFunc)
);


export {trim, map, mapBranches, mapLeaves};
