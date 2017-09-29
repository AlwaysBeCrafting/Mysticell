import classNames from "classnames";
import React from "react";

import { Dict } from "common/types";

import { SheetView } from "components/molecules";

import { Cell } from "data/Cell";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./SheetWrapper.scss";


interface Props {
	sheets: Dict<Sheet>;
	cells: Dict<Cell>;
	className?: string;
	propertyInputs: Dict<string[]>;
	propertyCache: PropertyCache;
}

const SheetWrapper = (props: Props) => (
	<div className={classNames("sheetWrapper", props.className)}>
		{
			Object.values(props.sheets).map(sheet => (
				<SheetView
					propertyInputs={props.propertyInputs}
					propertyCache={props.propertyCache}
					sheet={sheet}
					cells={props.cells}
					key={sheet.id}
				/>
			))
		}
	</div>
);


export {SheetWrapper};
