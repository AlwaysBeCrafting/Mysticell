import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";

import { ConnectedCellView, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { Sheet } from "data/Sheet";

import "./SheetView.scss";

interface Props {
  sheet: Sheet;
  cellIds: Iterable<string>;
}

class SheetView extends React.PureComponent<Props> {
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
          {Seq.Indexed(cellIds)
            .map(cellId => (
              <ConnectedCellView
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

export { SheetView, Props };
