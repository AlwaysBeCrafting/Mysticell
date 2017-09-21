type Tree<T> = Array<TreeNode<T>>;

interface TreeNode<T> {
	item: T;
	children: Tree<T>;
}


export {Tree, TreeNode};
