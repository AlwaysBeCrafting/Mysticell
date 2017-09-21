import {isBranch, Tree} from "common/types";

type TrimFunc = <B, L>(tree: Tree<B, L>) => boolean;

const trim = <B, L>(tree: Tree<B, L>, shouldKeep: TrimFunc): Tree<B, L> => {
	if (isBranch(tree)) {
		return {
			value: tree.value,
			children: tree.children
				.filter(shouldKeep)
				.map((child: Tree<B, L>) => trim(child, shouldKeep)),
		};
	}
	return tree;
};


export {trim};
