import classNames from "classnames";
import React from "react";

import {SheetView} from "components/molecules";

import "./SheetWrapper.scss";


interface Props {
	className?: string;
}

const SheetWrapper = (props: Props) => (
	<div className={classNames("sheetWrapper", props.className)}>
		<SheetView width={16} height={20} />
	</div>
);


export {SheetWrapper};
