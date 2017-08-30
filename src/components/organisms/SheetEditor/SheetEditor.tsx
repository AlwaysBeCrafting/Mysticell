import classNames from "classnames";
import React from "react";

import "./SheetEditor.scss";


interface Props {
	className?: string;
}


const SheetEditor = (props: Props) => (
	<div className={ classNames("sheetEditor", props.className) } />
);


export { SheetEditor };
