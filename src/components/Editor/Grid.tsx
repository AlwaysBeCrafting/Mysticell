import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Cell, Grid } from "data";

import { CellState } from "redux/reducers/document/cells";
import { GridState } from "redux/reducers/document/grids";

import CellComp from "./Cell";

import "./Grid.less";

interface GridAttributesProps {
	grid: Grid;
}

interface GridStateProps {
	cells: Map<number, Cell>;
}

type GridProps = GridAttributesProps & GridStateProps;

const GridComp = ( props: GridProps ) => (
	<li className={ `grid ${ props.grid.type }` } id={ `grid-${ props.grid.id }` } key={ props.grid.id }>
		<header>{ props.grid.title }</header>
		<div className="cell-area"> {
			Array.from( props.cells )
				.filter(([ id, cell ]) => cell.grid )
				.map(([ id, cell ]) => (
					<CellComp cell={ cell } />
				))
		} </div>
	</li>
);


export default reduxConnect<{}, {}, GridAttributesProps>(
	state => ({ cells: state.document.cells.cells }),
)( GridComp );
