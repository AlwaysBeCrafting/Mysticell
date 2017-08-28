interface TreeDir {
	type: 'dir';
	children: TreeItem[];
}

interface TreeFunction {
	type: 'function';
	id: string;
}

type TreeItem = TreeDir | TreeFunction;


export { TreeItem };
