import React from "react";

import { Dict } from "common/types";

import { CellView, Icon, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { Cell } from "data/Cell";
import { PARAMS } from "data/common";
import { isProperty, NodePrototype } from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./SheetView.scss";


interface Props {
	sheet: Sheet;
	nodePrototypes: Dict<NodePrototype>;
	propertyCache: PropertyCache;
	onCellChange: (cell: Cell, newValue: string) => void;
}
class SheetView extends React.PureComponent<Props> {
	public render() {
		const { sheet } = this.props;
		const style = {
			gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
		};
		return (
			<div className="sheetView" style={style}>
				<Toolbar className="sheetView-header">
					{sheet.title}
					<div style={{ flexGrow: 1}} />
					<ToolButton link to="">
						<Icon size={16} name="more_vert" />
					</ToolButton>
				</Toolbar>
				<div className="sheetView-grid">
					{
						Object.values(sheet.cells).map(this.renderCell)
					}
				</div>
			</div>
		);
	}

	private renderCell = (cell: Cell) => {
		const {
			sheet,
			propertyCache,
			onCellChange,
			nodePrototypes,
		} = this.props;
		if (cell.property.type === "input") {
			const cellPrototype = nodePrototypes[cell.property.id];
			const cellValue = isProperty(cellPrototype)
				? cellPrototype.inputValues[cell.property.index]
				: "";
			const param = PARAMS.string(cellValue);
			return (
				<CellView
					className="sheetView-grid-cell"
					param={param}
					key={cell.id}
					rect={sheet.layout[cell.id]}
					cell={cell}
					onChange={onCellChange}
				/>
			);
		} else {
			const cached = propertyCache[cell.property.id];
			const param = cached
				? cached[cell.property.index]
				: PARAMS.error("…", "Value has changed. Loading the new value now.");
			return (
				<CellView
					className="sheetView-grid-cell"
					param={param}
					key={cell.id}
					rect={sheet.layout[cell.id]}
					cell={cell}
				/>
			);
		}
	}
}


export { SheetView };
