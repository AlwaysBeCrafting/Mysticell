import React from 'react';

import './Tree.less';



export default ({ items, onCreateButtons, onExpandItem, onCollapseItem }) => <ul className="tree"> {
	items.map( ( item ) => <TreeItem
			item={ item }
			onCreateButtons={ onCreateButtons }
			onExpand={ onExpandItem }
			onCollapse={ onCollapseItem } /> )
} </ul>

const TreeItem = ({
	item, item: { id, path, children, expanded, },
	onCreateButtons = () => {},
	onExpand        = () => {},
	onCollapse      = () => {},
}) => <li
className={ ( children.length ? 'parent' : '' ) + ' ' + ( expanded ? 'expanded' : '' ) }
onClick={ ev => {
	expanded ? onCollapse( item ) : onExpand( item );
	ev.stopPropagation();
}}>
	<a>
		<label>{ path[path.length-1] }</label>
		{ onCreateButtons( item ) }
	</a>
	{ !!children.length && <ul> {
		children.map(( item ) => <TreeItem
			item={ item }
			onCreateButtons={ onCreateButtons }
			onExpand={ onExpand }
			onCollapse={ onCollapse }
		/> )
	} </ul> }
</li>
