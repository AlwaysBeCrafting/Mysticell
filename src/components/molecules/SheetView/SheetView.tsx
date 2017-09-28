import React from "react";

import {Toolbar} from "components/molecules";

import { Sheet } from "data/Sheet";

import "./SheetView.scss";


interface Props {
	sheet: Sheet;
}
const SheetView = (props: Props) => {
	const {sheet} = props;
	const style = {
		gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
	};
	return (
		<div className="sheetView" style={style}>
			<Toolbar title={sheet.title} className="sheetView-header" />
			<div className="sheetView-grid" />
		</div>
	);
};


export {SheetView};
