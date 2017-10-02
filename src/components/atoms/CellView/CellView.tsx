import classnames from "classnames";
import React from "react";

import { Rect2d } from "common/types";

import { Param } from "data/common";


interface Props {
	className?: string;
	param: Param;
	rect: Rect2d;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const CellView = (props: Props) => {
	const { className, param, rect, onChange } = props;
	const style = {
		gridArea: [rect.top, rect.left, rect.bottom, rect.right]
			.map(val => val + 1)
			.join(" / "),
	};
	return onChange
		? (
			<input
				style={style}
				className={classnames("cellView", className, "mod-input")}
				value={`${param.value}`}
				onChange={onChange}
			/>
		)
		: (
			<div style={style} className={classnames("cellView", className)}>
				{param.value}
			</div>
		);
};


export { CellView };
