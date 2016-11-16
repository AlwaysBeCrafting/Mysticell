import React from 'react';

import './Tree.less';



export default ({ items, onCreateButtons, onExpandItem, onCollapseItem }) => <ul className="tree"> {
	items.map( item => <TreeItem
		item={ item }
		onCreateButtons={ onCreateButtons }
		onExpand={ onExpandItem }
		onCollapse={ onCollapseItem } /> )
} </ul>;

const TreeItem = ({
	item, item: { id, path, children, expanded },
	onCreateButtons = () => {},
	onExpand        = () => {},
	onCollapse      = () => {},
}) => <li
	className={ [
		children.length ? 'parent' : '',
		expanded ? 'expanded' : '',
	].join( ' ' ) }>
	<a
		tabIndex="0"
		onClick={ ev => {
			ev.stopPropagation();
			return expanded ? onCollapse( item ) : onExpand( item );
		} }>
		<span className="text">{ path[path.length - 1] }</span>
		{ onCreateButtons( item ) }
	</a>
	{ !!children.length && <ul> {
		children.map( childItem => <TreeItem
			item={ childItem }
			onCreateButtons={ onCreateButtons }
			onExpand={ onExpand }
			onCollapse={ onCollapse } /> )
	} </ul> }
</li>;
