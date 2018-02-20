import classNames from "classnames";
import { Map } from "immutable";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { ErrorBoundary, SheetView } from "components/molecules";

import { AppState } from "data/AppState";
import { setInputValueAsync } from "data/CardTemplate";
import { Cell } from "data/Cell";
import { Palette } from "data/Palette";
import { Sheet } from "data/Sheet";

import "./SheetWrapper.scss";

interface StateProps {
  sheets: Map<string, Sheet>;
  palette: Palette;
}
interface DispatchProps {
  dispatch: (action: Redux.Action) => void;
}
interface OwnProps {
  className?: string;
}
type Props = StateProps & DispatchProps & OwnProps;
class PartialSheetWrapper extends React.PureComponent<Props> {
  render() {
    const { className, palette, sheets } = this.props;
    return (
      <div className={classNames("sheetWrapper", className)}>
        {sheets
          .map(sheet => (
            <ErrorBoundary key={sheet.id}>
              <SheetView
                sheet={sheet}
                palette={palette}
                onCellInput={this.onCellInput}
              />
            </ErrorBoundary>
          ))
          .toList()}
      </div>
    );
  }

  private onCellInput = (cell: Cell, newValue: string) => {
    const { palette } = this.props;
    const { index } = palette.getGraph(cell.property)!.graph.nodes.get(
      cell.node,
    )!;
    this.props.dispatch(setInputValueAsync(cell.property, index, newValue));
  };
}

const SheetWrapper = connect<StateProps, DispatchProps, OwnProps>(
  (state: AppState) => ({
    sheets: state.document.sheets,
    palette: state.document.palette,
  }),
  dispatch => ({ dispatch }),
)(PartialSheetWrapper);

export { SheetWrapper };
