import React from 'react';

import './Tree.less';



export default ({ items, onExpandItem, onCollapseItem }) => <ul className="tree"> {
	items.map( ( item ) => <TreeItem
			item={ item }
			onExpand={ onExpandItem }
			onCollapse={ onCollapseItem } /> )
} </ul>

const TreeItem = ({
	item: { id, path, children, expanded, },
	onExpand,
	onCollapse,
}) => <li
className={ ( children.length && 'parent' ) + ' ' + ( expanded && 'expanded' ) }
onClick={ () => expanded ? onCollapse( path ) : onExpand( path ) }>
	{ path[path.length-1] }
	{ children.length && <ul> {
		children.map(( item ) => <TreeItem
			item={ item }
			onExpand={ onExpand }
			onCollapse={ onCollapse }
		/> )
	} </ul> }
</li>
