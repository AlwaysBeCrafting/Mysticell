import * as React from 'react';

import './Tree.less';

//==============================================================================

export interface TreeItem {
	id: number;
	name: string;
	children: TreeItem[];
	expanded: boolean;
}

export interface TreeProps extends React.Props<Tree> {
	items: TreeItem[];
	onCreateButtons?: (item: TreeItem) => void;
	onExpandItem?: (item: TreeItem) => void;
	onCollapseItem?: (item: TreeItem) => void;
}

export class Tree extends React.Component<TreeProps, {}> {
	public render(): JSX.Element {
		const {
			items,
			onCreateButtons = () => { /* Do nothing */ },
			onExpandItem    = () => { /* Do nothing */ },
			onCollapseItem  = () => { /* Do nothing */ },
		} = this.props;
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
	}
}

interface TreeNodeProps extends React.Props<TreeNode> {
	item: TreeItem;
	onCreateButtons: (item: TreeItem) => void;
	onExpand: (item: TreeItem) => void;
	onCollapse: (item: TreeItem) => void;
}

class TreeNode extends React.Component<TreeNodeProps, {}> {
	public render(): JSX.Element {
		const { item, onCreateButtons, onExpand, onCollapse } = this.props;
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
	}
}

export default Tree;
