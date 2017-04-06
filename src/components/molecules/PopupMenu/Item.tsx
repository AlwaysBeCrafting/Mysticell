import * as React from 'react';

import { MenuItem } from 'components/atoms';

import './Item.scss';


interface Props {
	title: string;
	description?: string;
	enabled?: boolean;
	icon?: string;
	checkable?: boolean;
	checked?: boolean;
}


const Item = ( props: Props ) => {
	const descElem = props.description && (
		<span className="menuItem-description">{ props.description || '' }</span>
	);

	const iconElem = props.icon && (
		<img src={ props.icon } />
	);

	return (
		<div className="menuItem">
			<span className="menuItem-title">{ props.title }</span>
			{ descElem }
			{ iconElem }
		</div>
	);
};

export default Item;


export const createItem = ( item: MenuItem ) => (
	<Item
		title={ item.title }
		description={ item.hint }
		icon={ item.icon }
		/>
);
