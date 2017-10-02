import classNames from "classnames";
import React from "react";

import { Dict } from "common/types";

import { ErrorBoundary, SheetView } from "components/molecules";

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
				<ErrorBoundary key={sheet.id}>
					<SheetView
						propertyInputs={props.propertyInputs}
						propertyCache={props.propertyCache}
						sheet={sheet}
						cells={props.cells}
					/>
				</ErrorBoundary>
			))
		}
	</div>
);


export { SheetWrapper };
