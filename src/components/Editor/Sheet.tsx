import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { CellState, SheetState } from "redux/state";

import Cell from "./Cell";

import "./Sheet.less";

interface SheetAttributesProps {
	sheet: SheetState;
}

interface SheetStateProps {
	cells: Map<number, CellState>;
}

type SheetProps = SheetAttributesProps & SheetStateProps;

const Sheet = ( props: SheetProps ) => (
	<li className="sheet" id={ `sheet-${ props.sheet.id }` } key={ props.sheet.id }>
		<header>{ props.sheet.title }</header>
		<div className="cell-area"> {
			Array.from( props.cells )
				.filter(([ id, cell ]) => cell.sheet )
				.map(([ id, cell ]) => (
					<Cell cell={ cell } />
				))
		} </div>
	</li>
);


export default reduxConnect<{}, {}, SheetAttributesProps>(
	({ cells }) => ({ cells }),
)( Sheet );
