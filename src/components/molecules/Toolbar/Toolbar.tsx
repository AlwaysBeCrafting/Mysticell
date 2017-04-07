import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'common/types';

import Item from './Item';
import './Toolbar.scss';


interface Props extends React.HTMLAttributes<HTMLMenuElement> {
	title: string;
	navItem?: MenuItem;
	items?: MenuItem[];
}


export default ({ title, navItem, items, className, ...attrs }: Props ) => (
	<menu type="toolbar" { ...attrs } className={ classNames( 'toolbar', className ) }>
		{ navItem && <Item item={ navItem } /> }
		<li className="toolbar-title">{ title }</li>
		{ items && items.map(( item ) => <Item item={ item } /> ) }
	</menu>
);
