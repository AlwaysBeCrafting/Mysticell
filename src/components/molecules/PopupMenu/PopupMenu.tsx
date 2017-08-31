import classNames from "classnames";
import React from "react";

import {Anchor, Position} from "common/types";

import {MenuItem} from "data/common";

import {Item} from "./Item";
import "./PopupMenu.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
	position: Position;
	anchor?: Anchor;
	items: MenuItem[];
}

const PopupMenu = ({position, anchor, items, ...attrs}: Props) => {
	const style = {
		left: position.x,
		top: position.y,
	};

	const className = classNames(
		"popup",
		{
			"anchor-left": anchor && anchor.horizontal === "left",
			"anchor-right": anchor && anchor.horizontal === "right",
			"anchor-top": anchor && anchor.vertical === "top",
			"anchor-bottom": anchor && anchor.vertical === "bottom",
		},
	);

	return (
		<div {...attrs} className={className} style={style}>
			{items.map(item => <Item item={item} />)}
		</div>
	);
};


export {PopupMenu};
