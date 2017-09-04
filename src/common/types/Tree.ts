type Tree<T> = Array<TreeNode<T>>;

interface TreeNode<T> {
	item: T;
	children: Array<TreeNode<T>>;
}


export {Tree, TreeNode};
