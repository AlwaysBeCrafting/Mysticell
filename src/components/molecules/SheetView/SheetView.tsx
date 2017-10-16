import React from "react";

import { Dict } from "common/types";

import { CellView, Icon, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { Cell } from "data/Cell";
import { PARAMS } from "data/common";
import { isProperty, NodePrototype } from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./SheetView.scss";

interface Props {
  sheet: Sheet;
  nodePrototypes: Dict<NodePrototype>;
  propertyCache: PropertyCache;
  onCellInput: (cell: Cell, newValue: string) => void;
}
class SheetView extends React.PureComponent<Props> {
  public render() {
    const { sheet } = this.props;
    const style = {
      gridArea: `span ${sheet.size.height + 1} / span ${sheet.size.width}`,
    };
    return (
      <div className="sheetView" style={style}>
        <Toolbar className="sheetView-header">
          {sheet.title}
          <div style={{ flexGrow: 1 }} />
          <ToolButton link to="">
            <Icon size={16} name="more_vert" />
          </ToolButton>
        </Toolbar>
        <div className="sheetView-grid">
          {Object.values(sheet.cells).map(cell => (
            <CellView
              key={cell.id}
              className="sheetView-grid-cell"
              param={this.getParamForCell(cell)}
              rect={sheet.layout[cell.id]}
              cell={cell}
              onChange={this.onCellInput}
              readonly={cell.property.type !== "input"}
            />
          ))}
        </div>
      </div>
    );
  }

  private getParamForCell(cell: Cell) {
    const { propertyCache, nodePrototypes } = this.props;
    const cached = propertyCache[cell.property.id];
    const cellPrototype = nodePrototypes[cell.property.id];
    const cellValue = isProperty(cellPrototype)
      ? cellPrototype.inputValues[cell.property.index]
      : "";
    if (cell.property.type === "input") {
      return PARAMS.string(cellValue);
    }
    if (cached) {
      return cached[cell.property.index];
    }
    return PARAMS.error("…", "Value has changed. Loading the new value now.");
  }

  private onCellInput = (cell: Cell, newValue: string) => {
    this.props.onCellInput(cell, newValue);
  };
}

export { SheetView };
