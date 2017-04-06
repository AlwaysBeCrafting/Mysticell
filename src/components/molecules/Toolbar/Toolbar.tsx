import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'components/atoms';

import Item from './Item';
import './Toolbar.scss';


interface Props extends React.HTMLAttributes<HTMLMenuElement> {
	title: string;
	navItem?: MenuItem;
	items?: MenuItem[];
}


const navItem: MenuItem = {
	title: 'menu',
};


export default ( props: Props ) => (
	<menu type="toolbar" className={ classNames( 'toolbar', props.className ) }>
		{ <Item item={ navItem } /> }
		<li className="toolbar-title">{ props.title }</li>
		{ ( props.items || [] ).map(( item ) => <Item item={ item } /> ) }
	</menu>
);
