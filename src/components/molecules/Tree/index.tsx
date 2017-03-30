import * as React from "react";

import "./index.less";


export interface TreeItemData {
	id: number;
	name: string;
	isExpanded: boolean;
	children: TreeItemData[];
	buttons?: Array<React.ReactElement<any>>;

	onExpand: () => void;
	onCollapse: () => void;
}


interface TreeItemProps {
	item: TreeItemData;
}


const TreeItem = ( props: TreeItemProps ): React.ReactElement<any> => {
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
				item.children.map( ( childItem ) => <TreeItem
					key={ childItem.id }
					item={ childItem } /> )
			} </ul> }
		</li>
	);
};


export interface TreeProps {
	items: TreeItemData[];
}


export default ( props: TreeProps ) => {
	const { items } = props;
	return (
		<ul className="tree"> {
			items.map( item => <TreeItem
				key={ item.id }
				item={ item } /> )
		} </ul>
	);
};
