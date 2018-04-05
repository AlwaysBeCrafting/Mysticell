import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { connect } from "react-redux";

import { CellView, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { Sheet } from "data/Sheet";

import "./SheetView.scss";

interface OwnProps {
  sheetId: string;
}

interface StateProps {
  sheet: Sheet;
  cellIds: Iterable<string>;
}

type Props = OwnProps & StateProps;

class PartialSheetView extends React.PureComponent<Props> {
  render() {
    const { sheet, cellIds } = this.props;
    const style = {
      gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
    };
    return (
      <div className="sheetView" style={style}>
        <Toolbar className="sheetView-header">
          <div className="sheetView-header-name">{sheet.name}</div>
          <div style={{ flexGrow: 1 }} />
          <ToolButton link to="">
            <Icon name="more_vert" />
          </ToolButton>
        </Toolbar>
        <div className="sheetView-grid">
          {Seq(cellIds)
            .map(cellId => (
              <CellView
                key={cellId}
                className="sheetView-grid-cell"
                cellId={cellId}
              />
            ))
            .toList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  cellIds: state.entities.cellSheets
    .filter(sheetId => sheetId === props.sheetId)
    .keySeq(),
  sheet: state.entities.sheets.get(props.sheetId, new Sheet()),
});

const SheetView = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialSheetView,
);

export { SheetView };
