import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { CellState, GridState } from "redux/state";

import Cell from "./Cell";

import "./Grid.less";

interface GridAttributesProps {
	grid: GridState;
}

interface GridStateProps {
	cells: Map<number, CellState>;
}

type GridProps = GridAttributesProps & GridStateProps;

const Grid = ( props: GridProps ) => (
	<li className={ `grid ${ props.grid.type }` } id={ `grid-${ props.grid.id }` } key={ props.grid.id }>
		<header>{ props.grid.title }</header>
		<div className="cell-area"> {
			Array.from( props.cells )
				.filter(([ id, cell ]) => cell.grid )
				.map(([ id, cell ]) => (
					<Cell cell={ cell } />
				))
		} </div>
	</li>
);


export default reduxConnect<{}, {}, GridAttributesProps>(
	({ cells }) => ({ cells }),
)( Grid );
