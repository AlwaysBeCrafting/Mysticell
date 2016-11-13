import React from 'react';

import './Tree.less';



export default ({ items, mapItem }) => <ul className="tree"> {
	items.map( mapItem )
		.map( item => <TreeItem item={ item } key={ item.value } /> )
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
	mapItem }}) => {
			
	let path = parentPath.concat( [text] );
	let hasChildren = children && ( children.length > 0 );
	
	let className = [
		( hasChildren ? 'parent' : '' ),
		( expanded ? 'expanded' : '' )
	].join( ' ' );
	
	return <li className={ className } onClick={ () => expanded ? collapse( path ) : expand( path ) }>
		<label>{ text }</label>
		{ buttons.map( ({ src, alt, onClick }) => <img
			src={ src }
			alt={ alt }
			onClick={ event => {
				onClick( path );
				event.stopPropagation();
			}}
		/> ) }
		{ hasChildren && <ul> {
			children
				.map( mapItem )
				.map( item => <TreeItem item={ item } key={ item.value } /> )
		} </ul> }
	</li>
};
