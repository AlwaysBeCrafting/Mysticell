import * as React from "react";

import "./Tree.less";

//==============================================================================

export interface TreeItem {
	id: number;
	name: string;
	isExpanded: boolean;
	children: TreeItem[];
	buttons?: Array<React.ReactElement<any>>;

	onExpand: () => void;
	onCollapse: () => void;
}

export interface TreeProps {
	items: TreeItem[];
}

const Tree = ( props: TreeProps ) => {
	const { items } = props;
	return (
		<ul className="tree"> {
			items.map( item => <TreeNode
				key={ item.id }
				item={ item } /> )
		} </ul>
	);
};

//------------------------------------------------------------------------------

interface TreeNodeProps {
	item: TreeItem;
}

const TreeNode = ( props: TreeNodeProps ): React.ReactElement<any> => {
	const { item } = props;

	return (
		<li
			className={ [
				item.children.length ? "parent" : "",
				item.isExpanded ? "expanded" : "",
			].join( " " ) }>
			<a
				tabIndex={ 0 }
				onClick={ ev => {
					ev.stopPropagation();
					item.isExpanded ? item.onCollapse() : item.onExpand();
				} }>
				<span className="text">{ item.name }</span>
				{ item.buttons }
			</a>
			{ !!item.children.length && <ul> {
				item.children.map( ( childItem ) => <TreeNode
					key={ childItem.id }
					item={ childItem } /> )
			} </ul> }
		</li>
	);
};

export default Tree;
