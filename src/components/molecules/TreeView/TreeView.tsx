import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'data/common';

import Item from './Item';
import './TreeView.scss';


interface Props extends React.HTMLAttributes<HTMLUListElement> {
	items: MenuItem[];
	expandedItems: string[];
}


export default ({ items, expandedItems, className, ...attrs }: Props ) => (
	<ul { ...attrs } className={ classNames( 'treeView', className ) }>
		{
			items.map(( item ) => (
				<Item key={ item.id } item={ item } isExpanded={ expandedItems.indexOf( item.id ) >= 0 } />
			))
		}
	</ul>
);
