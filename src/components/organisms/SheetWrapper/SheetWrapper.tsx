import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { Dict } from "common/types";

import { ErrorBoundary, SheetView } from "components/molecules";

import { Cell } from "data/Cell";
import { PropertyCache } from "data/PropertyCache";
import { PropertyInputs, setValueAsync } from "data/PropertyInputs";
import { Sheet } from "data/Sheet";

import "./SheetWrapper.scss";


interface DispatchProps {
	dispatch: (action: Redux.Action) => void;
}
interface OwnProps {
	sheets: Dict<Sheet>;
	cells: Dict<Cell>;
	className?: string;
	propertyInputs: PropertyInputs;
	propertyCache: PropertyCache;
}
type Props =
	& DispatchProps
	& OwnProps;
class ProtoSheetWrapper extends React.PureComponent<Props> {
	public render() {
		const {
			className,
			sheets,
			cells,
			propertyInputs,
			propertyCache,
		} = this.props;
		return (
			<div className={classNames("sheetWrapper", className)}>
				{
					Object.values(sheets).map(sheet => (
						<ErrorBoundary key={sheet.id}>
							<SheetView
								propertyInputs={propertyInputs}
								propertyCache={propertyCache}
								sheet={sheet}
								cells={cells}
								onCellChange={this.onCellChange}
							/>
						</ErrorBoundary>
					))
				}
			</div>
		);
	}

	private onCellChange = (cell: Cell, newValue: string) => {
		this.props.dispatch(setValueAsync(
			cell.property.id,
			cell.property.index,
			newValue,
		));
	}
}

const SheetWrapper = connect<{}, DispatchProps>(
	undefined,
	dispatch => ({ dispatch }),
)(ProtoSheetWrapper);


export { SheetWrapper };
