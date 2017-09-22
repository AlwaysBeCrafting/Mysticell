import {isBranch, Tree} from "common/types";

type TrimFunc = (tree: Tree<any>) => boolean;

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


export {trim};
