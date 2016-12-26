import * as React from 'react';

import './Tree.less';

//==============================================================================

export interface TreeItem {
	id: number;
	name: string;
	children: TreeItem[];
	expanded: boolean;
}

export interface TreeProps {
	items: TreeItem[];
	onCreateButtons?: (item: TreeItem) => void;
	onExpandItem?: (item: TreeItem) => void;
	onCollapseItem?: (item: TreeItem) => void;
}

export default ( props: TreeProps ) => {
	const {
		items,
		onCreateButtons = () => { /* Do nothing */ },
		onExpandItem    = () => { /* Do nothing */ },
		onCollapseItem  = () => { /* Do nothing */ },
	} = props;
	return (
		<ul className="tree"> {
			items.map( item => <TreeNode
			key={ item.id }
			item={ item }
			onCreateButtons={ onCreateButtons }
			onExpand={ onExpandItem }
			onCollapse={ onCollapseItem } /> )
		} </ul>
	);
};

//------------------------------------------------------------------------------

interface TreeNodeProps {
	item: TreeItem;
	onCreateButtons: (item: TreeItem) => void;
	onExpand: (item: TreeItem) => void;
	onCollapse: (item: TreeItem) => void;
}

const TreeNode = ( props: TreeNodeProps ): React.ReactElement<any> => {
	const { item, onCreateButtons, onExpand, onCollapse } = props;
	const { id, name, children, expanded } = item;
	return (
		<li
			className={ [
				children.length ? 'parent' : '',
				expanded ? 'expanded' : '',
			].join( ' ' ) }>
			<a
				tabIndex={ 0 }
				onClick={ ev => {
					ev.stopPropagation();
					return expanded ? onCollapse( item ) : onExpand( item );
				} }>
				<span className="text">{ name }</span>
				{ onCreateButtons( item ) }
			</a>
			{ !!children.length && <ul> {
				children.map( ( childItem ) => <TreeNode
					key={ childItem.id }
					item={ childItem }
					onCreateButtons={ onCreateButtons }
					onExpand={ onExpand }
					onCollapse={ onCollapse } /> )
			} </ul> }
		</li>
	);
};
