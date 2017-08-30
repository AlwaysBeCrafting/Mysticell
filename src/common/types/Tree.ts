interface Tree<T> extends Array<TreeNode<T>> {}

type TreeNode<T> = TreeParent<T> | TreeItem<T>;

interface TreeParent<T> {
	type: 'parent';
	name: string;
	children: Array<TreeNode<T>>;
}

interface TreeItem<T> {
	type: 'item';
	name: string;
	item: T;
}


export { Tree, TreeNode };
