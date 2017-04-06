import * as React from 'react';

import { TreeItem } from 'components/atoms';

import { createItem } from './Item';
import './TreeView.scss';


interface Props {
	items: TreeItem[];
	expanded: number[] | (( TreeItem ) => boolean );
}


export default ( props: Props ) => (
	<ul className="treeView"> { props.items.map( createItem ) } </ul>
);
