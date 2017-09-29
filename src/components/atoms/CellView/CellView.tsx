import classnames from "classnames";
import React from "react";

import { Rect2d } from "common/types";

import { Cell } from "data/Cell";


interface Props {
	cell: Cell;
	rect?: Rect2d;
	className?: string;
}
const CellView = (props: Props) => {
	const {cell, rect, className} = props;
	const style = {} as any;
	if (rect) {
		style.gridArea = [rect.top, rect.left, rect.bottom, rect.right]
			.map(val => val + 1)
			.join(" / ");
	}
	return (
		<div style={style} className={classnames("cellView", className)}>
			{cell.id}
		</div>
	);
};


export {CellView};
