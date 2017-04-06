import * as classNames from 'classnames';
import * as React from 'react';

import { TreeItem } from 'components/atoms';


interface Props extends React.HTMLAttributes<HTMLLIElement> {
	item: TreeItem;
	title: string;
	isExpanded?: boolean;
	children?: TreeItem[];
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
