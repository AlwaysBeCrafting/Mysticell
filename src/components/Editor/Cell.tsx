import * as React from "react";

import { CellState } from "redux/state";

import "./Cell.less";

interface CellProps {
	cell: CellState;
}

export default ( props: CellProps ) => {
	const style = {
		left: props.cell.start.x,
		top: props.cell.start.y,
		right: `calc( 100% - ${ props.cell.end.x }px )`,
		bottom: `calc( 100% - ${ props.cell.end.y }px )`,
	};

	return (
		<div className="cell" style={ style }>&nbsp;</div>
	);
};
