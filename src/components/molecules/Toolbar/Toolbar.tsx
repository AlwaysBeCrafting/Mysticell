import classNames from 'classnames';
import React from 'react';

import { MenuItem } from 'data/common';

import Item from './Item';
import './Toolbar.scss';


interface Props extends React.HTMLAttributes<HTMLMenuElement> {
	title: string;
	navItem?: MenuItem;
	items?: MenuItem[];
}


export default ({ title, navItem, items, className, ...attrs }: Props ) => (
	<menu type="toolbar" { ...attrs } className={ classNames( 'toolbar', className ) }>
		{ navItem && <Item menuItem={ navItem } /> }
		<li className="toolbar-title">{ title }</li>
		{ items && items.map(( item ) => <Item menuItem={ item } key={ item.id } /> ) }
	</menu>
);
