import classnames from "classnames";
import React from "react";

import { Cell } from "data/Cell";


interface Props {
	cell: Cell;
	className?: string;
}
const CellView = (props: Props) => {
	return (
		<div className={classnames("cellView", props.className)}>
		{
			props.cell.id
		}
		</div>
	);
};


export {CellView};
