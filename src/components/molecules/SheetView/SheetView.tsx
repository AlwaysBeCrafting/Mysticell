import React from "react";

import { CellView, Icon, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { Cell } from "data/Cell";
import { Param, PARAMS } from "data/common";
import { Palette } from "data/Palette";
import { Sheet } from "data/Sheet";

import "./SheetView.scss";

interface Props {
  sheet: Sheet;
  palette: Palette;
  onCellInput: (cell: Cell, newValue: string) => void;
}
class SheetView extends React.PureComponent<Props> {
  render() {
    const { sheet, palette } = this.props;
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
          {sheet.cells
            .map(cell => (
              <CellView
                key={cell.id}
                className="sheetView-grid-cell"
                param={this.getParamForCell(cell)}
                rect={cell.rect}
                cell={cell}
                onChange={this.onCellInput}
                readonly={
                  palette.getGraph(cell.property)!.graph.nodes.get(cell.node)!
                    .wireAnchor === "end"
                }
              />
            ))
            .toList()}
        </div>
      </div>
    );
  }

  private getParamForCell(cell: Cell): Param {
    const { palette } = this.props;
    const template = palette.getProperty(cell.property);
    if (!template) {
      return PARAMS.error("PROP", "Property doesn't exist");
    }
    const node = template.graph.nodes.get(cell.node);
    if (!node) {
      return PARAMS.error("NODE", "Node doesn't exist");
    }
    return node.wireAnchor === "start"
      ? PARAMS.string(template.inputValues.get(node.index, ""))
      : template.outputValues.get(
          node.index,
          PARAMS.error("VAL", "Output value doesn't exist"),
        );
  }

  private onCellInput = (cell: Cell, newValue: string) => {
    this.props.onCellInput(cell, newValue);
  };
}

export { SheetView };
