import { Dict, isBranch, isLeaf } from "common/types";
import { resolvePath } from "common/utils";

import { Nav } from "data/Nav";
import { NodePrototype } from "data/NodePrototype";


const pathToNodePrototype = (
	prototypes: Dict<NodePrototype>,
	nav: Nav,
	path: string[],
): NodePrototype | undefined => {
	const branch = resolvePath(
		nav,
		path.slice(0, -1),
		(tree, segment) => tree.value === segment,
	);
	const [name] = path.slice(-1);

	if (!isBranch(branch)) { return undefined; }
	const leaf = branch.children.find(child => (
		isLeaf(child) &&
		prototypes[child.value] &&
		prototypes[child.value].name === name
	));

	return isLeaf(leaf)
		? prototypes[leaf.value]
		: undefined;
};


export { pathToNodePrototype };
