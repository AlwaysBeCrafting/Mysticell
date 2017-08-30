import classNames from "classnames";
import React from "react";

import "./SheetEditor.scss";


interface Props {
	className?: string;
}


export default (props: Props) => (
	<div className={ classNames("sheetEditor", props.className) } />
);
