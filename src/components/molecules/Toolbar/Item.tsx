import * as React from 'react';

import { MenuItem } from 'data/common';

import './Item.scss';


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	item: MenuItem;
	enabled?: boolean;
	checkable?: boolean;
	checked?: boolean;
}


export const Item = ( props: Props ) => {
	const iconElem = props.item.icon && (
		<img
			className="toolbar-item-icon"
			title={ props.item.title }
			src={ props.item.icon }
			/>
	);

	return (
		<button className="toolbar-item">
			{ iconElem || props.item.title }
		</button>
	);
};

export default Item;
