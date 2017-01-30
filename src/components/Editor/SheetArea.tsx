import * as React from "react";

import { SheetState } from "redux/state";

import Sheet from "./Sheet";

import "./SheetArea.less";

interface SheetAreaProps {
	sheets: Map<number, SheetState>;
}

export default ( props: SheetAreaProps ) => <ul id="sheet-area"> {
	Array.from( props.sheets )
		.filter(([ id, sheet ]) => sheet.isVisible )
		.map(([ id, sheet ]) => <Sheet sheet={ sheet } /> )
} </ul>;
