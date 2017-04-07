import * as React from 'react';

import { MenuItem } from 'common/types';

import Item from './Item';
import './TreeView.scss';


interface Props {
	items: MenuItem[];
	expanded: number[] | (( TreeItem ) => boolean );
}


export default ( props: Props ) => (
	<ul className="treeView"> { props.items.map(( item ) => <Item item={ item } /> ) } </ul>
);
