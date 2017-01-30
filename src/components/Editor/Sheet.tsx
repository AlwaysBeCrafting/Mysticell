import * as React from "react";

import { SheetState } from "redux/state";

import "./Sheet.less";

interface SheetProps {
	sheet: SheetState;
}

export default ( props: SheetProps ) => (
	<li className="sheet" id={ `sheet-${ props.sheet.id }` } key={ props.sheet.id }>
		<header>{ props.sheet.title }</header>
	</li>
);
