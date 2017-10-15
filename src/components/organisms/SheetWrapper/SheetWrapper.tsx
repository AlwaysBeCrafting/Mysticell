import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { Dict } from "common/types";

import { ErrorBoundary, SheetView } from "components/molecules";

import { AppState } from "data/AppState";
import { Cell } from "data/Cell";
import {
  changePropertyInputValueAsync,
  NodePrototype,
} from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./SheetWrapper.scss";

interface StateProps {
  sheets: Dict<Sheet>;
  propertyCache: PropertyCache;
  nodePrototypes: Dict<NodePrototype>;
}
interface DispatchProps {
  dispatch: (action: Redux.Action) => void;
}
interface OwnProps {
  className?: string;
}
type Props = StateProps & DispatchProps & OwnProps;
class PartialSheetWrapper extends React.PureComponent<Props> {
  public render() {
    const { className, nodePrototypes, sheets, propertyCache } = this.props;
    return (
      <div className={classNames("sheetWrapper", className)}>
        {Object.values(sheets).map(sheet => (
          <ErrorBoundary key={sheet.id}>
            <SheetView
              propertyCache={propertyCache}
              nodePrototypes={nodePrototypes}
              sheet={sheet}
              onCellInput={this.onCellInput}
            />
          </ErrorBoundary>
        ))}
      </div>
    );
  }

  private onCellInput = (cell: Cell, newValue: string) => {
    this.props.dispatch(
      changePropertyInputValueAsync(
        cell.property.id,
        cell.property.index,
        newValue,
      ),
    );
  };
}

const SheetWrapper = connect<StateProps, DispatchProps, OwnProps>(
  (state: AppState) => ({
    sheets: state.document.sheets,
    nodePrototypes: state.document.nodePrototypes,
    propertyCache: state.propertyCache,
  }),
  dispatch => ({ dispatch }),
)(PartialSheetWrapper);

export { SheetWrapper };
