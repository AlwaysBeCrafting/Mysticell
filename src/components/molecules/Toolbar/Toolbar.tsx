import classNames from "classnames";
import React from "react";

import "./Toolbar.scss";


interface Props {
	children?: {};
	className?: string;
}
const Toolbar = (props: Props) => (
	<menu type="toolbar" className={classNames("toolbar", props.className)}>
		{props.children}
	</menu>
);


export { Toolbar };
