import * as React from 'react';

import { MenuItem } from 'components/atoms';

import { createItem } from './Item';
import './Toolbar.less';


interface Props {
	title: string;
	navItem?: MenuItem;
	items?: MenuItem[];
}


export default ( props: Props ) => (
	<menu type="toolbar" className="toolbar">{ ( props.items || [] ).map( createItem ) }</menu>
);
