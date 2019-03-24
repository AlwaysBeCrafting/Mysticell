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

const SheetView = (props: Props) => {
  const { sheet, cellIds } = props;
  const style = {
    gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
  };
  return (
    <div className="SheetView" style={style}>
      <Toolbar className="SheetView-header">
        <div className="SheetView-header-name">{sheet.name}</div>
        <div style={{ flexGrow: 1 }} />
        <ToolButton to="">
          <Icon name="more_vert" />
        </ToolButton>
      </Toolbar>
      <div className="SheetView-grid">
        {Seq.Indexed(cellIds)
          .map(cellId => (
            <ConnectedCellView
              key={cellId}
              className="SheetView-grid-cell"
              cellId={cellId}
            />
          ))
          .toList()}
      </div>
    </div>
  );
};

export { SheetView, Props };
