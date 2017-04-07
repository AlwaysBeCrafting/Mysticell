import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'common/types';

import Item from './Item';
import './TreeView.scss';


interface Props extends React.HTMLAttributes<HTMLUListElement> {
	items: MenuItem[];
	expandedItems: number[];
}


export default ({ items, expandedItems, className, ...attrs }: Props ) => (
	<ul { ...attrs } className={ classNames( 'treeView', className ) }>
		{
			items.map(( item ) => (
				<Item item={ item } expanded={ expandedItems.indexOf( item.id ) >= 0 } />
			))
		}
	</ul>
);
