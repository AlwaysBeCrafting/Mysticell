import React from "react";

import { MenuItem } from "data/common";

import "./Item.scss";


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	menuItem: MenuItem;
	enabled?: boolean;
	checkable?: boolean;
	checked?: boolean;
}


const Item = (props: Props) => {
	const { menuItem } = props;
	const iconElem = menuItem.icon && (
		<img
			className="toolbar-item-icon"
			title={ menuItem.title }
			src={ menuItem.icon }
			/>
	);

	if (menuItem.render) {
		return menuItem.render(menuItem);

	} else {
		return (
			<button className="toolbar-item">
				{ iconElem || menuItem.title }
			</button>
		);
	}
};

export { Item };
