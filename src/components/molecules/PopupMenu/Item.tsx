import classNames from "classnames";
import React from "react";

import { MenuItem } from "data/common";

import "./Item.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
	item: MenuItem;
}

const Item = ({ item, className, ...attrs }: Props) => {
	const descElem = item.title && (
		<span className="menuItem-description">{ item.title || "" }</span>
	);

	const iconElem = item.icon && (
		<img src={ item.icon } />
	);

	return (
		<div { ...attrs } className={ classNames("menuItem", className) }>
			<span className="menuItem-title">{ item.title }</span>
			{ descElem }
			{ iconElem }
		</div>
	);
};


export { Item };
