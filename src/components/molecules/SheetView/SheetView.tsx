import React from "react";

import {Toolbar} from "components/molecules";

import "./SheetView.scss";


interface Props {
	width: number;
	height: number;
}
const SheetView = (props: Props) => {
	const style = {
		gridArea: `span ${props.height + 1} / span ${props.width}`,
	};
	return (
		<div className="sheetView" style={style}>
			<Toolbar title="Sheet Title" className="sheetView-header" />
			<div className="sheetView-grid" />
		</div>
	);
};


export {SheetView};
