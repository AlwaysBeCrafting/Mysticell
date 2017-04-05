interface TreeItem {
	id: number;
	title: string;
	isExpanded: boolean;
	children?: TreeItem[];
}

export default TreeItem;
