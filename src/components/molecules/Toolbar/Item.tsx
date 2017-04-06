import * as React from 'react';

import { MenuItem } from 'components/atoms';

import './Item.scss';


interface Props {
	text: string;
	icon?: string;
	enabled?: boolean;
	checkable?: boolean;
	checked?: boolean;
}


export const Item = ( props: Props ) => {
	const iconElem = props.icon && (
		<img
			className="toolbar-item-icon"
			title={ props.text }
			src={ props.icon }
			/>
	);

	return (
		<button className="toolbar-button">
			{ iconElem || props.text }
		</button>
	);
};

export default Item;


export const createItem = ( item: MenuItem ) => (
	<Item
		text={ item.title }
		icon={ item.icon }
		/>
);
