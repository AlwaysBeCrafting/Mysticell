import {Id} from 'data/shared';
import * as React from 'react';

import './Tree.less';

export interface TreeItemData {
	id: any;
	path: string[];
	children: TreeItemData[];
	expanded: boolean;
}

export interface TreeProps extends React.Props<Tree> {
	items: any[];
	onCreateButtons?: (item?: any) => void;
	onExpandItem?: (item?: any) => void;
	onCollapseItem?: (item?: any) => void;
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
				items.map( item => <TreeItem
				key={ item.id }
				item={ item }
				onCreateButtons={ onCreateButtons }
				onExpand={ onExpandItem }
				onCollapse={ onCollapseItem } /> )
			} </ul>
		);
	}
}

interface TreeItemProps extends React.Props<TreeItem> {
	item: any;
	onCreateButtons: (item: any) => void;
	onExpand: (item: any) => void;
	onCollapse: (item: any) => void;
}

class TreeItem extends React.Component<TreeItemProps, {}> {
	public render(): JSX.Element {
		const { item, onCreateButtons, onExpand, onCollapse } = this.props;
		const { id, path, children, expanded } = item;
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
					<span className="text">{ path[path.length - 1] }</span>
					{ onCreateButtons( item ) }
				</a>
				{ !!children.length && <ul> {
					children.map( (childItem: any) => <TreeItem
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
