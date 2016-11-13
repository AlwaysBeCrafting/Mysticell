import React from 'react';

import './Tree.less';



export default ({ items, mapItem }) => <ul className="tree"> {
	items.map( mapItem )
		.map( item => <TreeItem
			item={ {...item, parentPath: [], mapItem: mapItem } }
			key={ item.value }
		/> )
} </ul>

const TreeItem = ({ item: {
	text,
	value,
	buttons,
	parentPath,
	children,
	expanded,
	expand,
	collapse,
 	mapItem,
}}) => {
	
	const path = parentPath.concat( [text] );
	const hasChildren = children && ( children.length > 0 );
	
	const className = [
		( hasChildren ? 'parent' : '' ),
		( expanded ? 'expanded' : '' )
	].join( ' ' );
	
	return <li className={ className } onClick={ () => expanded ? collapse( path ) : expand( path ) }>
		<a><label>{ text }</label>
		{ buttons.map( ({ src, alt, onClick }, i) => <img
			src={ src }
			alt={ alt }
			onClick={ event => {
				onClick( path );
				event.stopPropagation();
			}}
			key={ i }
		/> ) }</a>
		{ hasChildren && <ul> {
			children
				.map( mapItem )
				.map( item => <TreeItem
					item={ { ...item, parentPath: path, mapItem: mapItem } }
					key={ item.value }
				/> )
		} </ul> }
	</li>
};
