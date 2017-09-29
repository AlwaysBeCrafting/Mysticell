import classnames from "classnames";
import React from "react";

import { Rect2d } from "common/types";


interface Props {
	value: string | number;
	rect?: Rect2d;
	className?: string;
}
const CellView = (props: Props) => {
	const {value, rect, className} = props;
	const style = {} as any;
	if (rect) {
		style.gridArea = [rect.top, rect.left, rect.bottom, rect.right]
			.map(val => val + 1)
			.join(" / ");
	}
	return (
		<div style={style} className={classnames("cellView", className)}>
			{value}
		</div>
	);
};


export {CellView};
