import * as React from 'react';

import { TreeItem } from 'components/atoms';


interface Props extends React.HTMLAttributes<HTMLLIElement> {
	item: TreeItem;
	title: string;
	isExpanded?: boolean;
	children?: TreeItem[];
}


const Item = ( props: Props ) => {
	const classList = [ 'treeView-item' ];
	if ( props.isExpanded ) classList.push( 'is-expanded' );
	if ( props.children && props.children.length ) classList.push( 'is-parent' );

	const childrenElem = props.children && !!props.children.length && (
		<ul className="treeView-item-children">
			{ props.children.map(( child ) => <Item item={ child } /> ) }
		</ul>
	);

	return (
		<li className={ classList.join( ' ' ) }>
			<a className="treeView-item-body">
				<span className="treeView-item-body-title">{ props.title }</span>
			</a>
			{ childrenElem }
		</li>
	);
};

export default Item;
