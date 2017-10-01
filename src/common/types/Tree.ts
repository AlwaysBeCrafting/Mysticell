interface Branch<B, L> {
	value: B;
	children: Array<Tree<B, L>>;
}

interface Leaf<L> {
	value: L;
}

type Tree<B, L = B> = Branch<B, L> | Leaf<L>;

const isLeaf = <B, L>(tree?: Tree<B, L>): tree is Leaf<L> => (
	!!(tree && !isBranch(tree))
);

const isBranch = <B, L>(tree?: Tree<B, L>): tree is Branch<B, L> => (
	!!(tree && (tree as any).children)
);


export { Tree, isLeaf, isBranch };
