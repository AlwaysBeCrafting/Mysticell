import classNames from "classnames";
import React from "react";

import {Dict} from "common/types";

import {SheetView} from "components/molecules";

import {Sheet} from "data/Sheet";

import "./SheetWrapper.scss";


interface StateProps {
	sheets: Dict<Sheet>;
}
interface OwnProps {
	className?: string;
}
type Props =
	& StateProps
	& OwnProps;

const SheetWrapper = (props: Props) => (
	<div className={classNames("sheetWrapper", props.className)}>
		{
			Object.values(props.sheets).map(sheet => (
				<SheetView sheet={sheet} key={sheet.id} />
			))
		}
	</div>
);


export {SheetWrapper};
