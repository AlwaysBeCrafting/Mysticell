import classNames from "classnames";
import React from "react";

import "./SheetView.scss";


interface Props {
	className?: string;
}

const SheetView = (props: Props) => (
	<div className={classNames("sheetView", props.className)} />
);


export {SheetView};
