import classNames from "classnames";
import React from "react";

import "./SheetEditor.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export default ({ className, ...attrs }: Props) => (
	<div { ...attrs } className={ classNames("sheetEditor", className) } />
);
