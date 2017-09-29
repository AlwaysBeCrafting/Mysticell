import React from "react";

import { Dict } from "common/types";

import {CellView} from "components/atoms";
import {Toolbar} from "components/molecules";

import { Cell } from "data/Cell";
import { Sheet } from "data/Sheet";

import "./SheetView.scss";


interface Props {
	sheet: Sheet;
	cells: Dict<Cell>;
}
const SheetView = (props: Props) => {
	const {cells, sheet} = props;
	const style = {
		gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
	};
	return (
		<div className="sheetView" style={style}>
			<Toolbar title={sheet.title} className="sheetView-header" />
			<div className="sheetView-grid">
				{
					Object.keys(sheet.layout)
						.map(cellId => cells[cellId])
						.filter(cell => !!cell)
						.map(cell => (
							<CellView
								cell={cell}
								key={cell.id}
								rect={sheet.layout[cell.id]}
								className="sheetView-grid-cell"
							/>
						))
				}
			</div>
		</div>
	);
};


export {SheetView};
