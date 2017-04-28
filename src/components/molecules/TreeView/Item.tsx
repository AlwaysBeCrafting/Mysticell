import classNames from 'classnames';
import React from 'react';

import { MenuItem } from 'data/common';

import './Item.scss';


interface Props extends React.HTMLAttributes<HTMLLIElement> {
	item: MenuItem;
	isExpanded?: boolean;
}


const Item = ({ item, isExpanded, ...attrs }: Props ) => {
	const { childItems } = item;
	const className = classNames(
		'treeView-item',
		{
			'is-expanded': isExpanded,
			'is-parent': childItems && childItems.length,
		},
	);

	const childrenElem = childItems && !!childItems.length && (
		<ul className="treeView-item-children">
			{ childItems.map(( child ) => <Item item={ child } key={ child.id }/> ) }
		</ul>
	);

	return (
		<li { ...attrs } className={ className }>
			<a className="treeView-item-body">
				<span className="treeView-item-body-icon">arrow_drop_down</span>
				<span className="treeView-item-body-title">{ item.title }</span>
			</a>
			{ childrenElem }
		</li>
	);
};

export default Item;
