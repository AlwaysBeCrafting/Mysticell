import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'common/types';


interface Props extends React.HTMLAttributes<HTMLLIElement> {
	item: MenuItem;
	title: string;
	isExpanded?: boolean;
	children?: MenuItem[];
}


const Item = ( props: Props ) => {
	const className = classNames(
		'treeView-item',
		{
			'is-expanded': props.isExpanded,
			'is-parent': props.children && props.children.length,
		},
	);

	const childrenElem = props.children && !!props.children.length && (
		<ul className="treeView-item-children">
			{ props.children.map(( child ) => <Item item={ child } /> ) }
		</ul>
	);

	return (
		<li className={ className }>
			<a className="treeView-item-body">
				<span className="treeView-item-body-title">{ props.title }</span>
			</a>
			{ childrenElem }
		</li>
	);
};

export default Item;
