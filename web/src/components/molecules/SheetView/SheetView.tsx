import React from "react";
import { Icon } from "react-atoms";

import { CellView, ToolButton } from "~/components/atoms";
import { Toolbar } from "~/components/molecules";

import { useCellList } from "~/data/Cell";
import { useSheet } from "~/data/Sheet";

import "./SheetView.scss";

interface Props {
  sheetId: string;
}

const SheetView = (props: Props) => {
  const { sheetId } = props;

  const [sheet] = useSheet(sheetId);
  if (!sheet) return null;

  const [cells] = useCellList(sheetId);

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
        {cells.toIndexedSeq().map(cellId => (
          <CellView
            key={cellId}
            className="SheetView-grid-cell"
            cellId={cellId}
          />
        ))}
      </div>
    </div>
  );
};

export { SheetView };
