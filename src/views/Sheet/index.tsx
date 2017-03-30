import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Cell, Sheet } from "common/types/document";

import CellComp from "./Cell";

import "./index.less";

interface SheetAttributesProps {
	sheet: Sheet;
}

interface GridStateProps {
	cells: Map<number, Cell>;
}

type GridProps = SheetAttributesProps & GridStateProps;

const GridComp = ( props: GridProps ) => (
	<li className="sheet" id={ `sheet-${ props.sheet.id }` } key={ props.sheet.id }>
		<header>{ props.sheet.title }</header>
		<div className="cell-area"> {
			Array.from( props.cells )
				.filter(([ id, cell ]) => cell.sheet )
				.map(([ id, cell ]) => (
					<CellComp cell={ cell } />
				))
		} </div>
	</li>
);


export default reduxConnect<{}, {}, SheetAttributesProps>(
	state => ({ cells: state.document.cells.cells }),
)( GridComp );
