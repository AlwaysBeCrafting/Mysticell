import classnames from "classnames";
import React from "react";

import { CommonAttributes } from "common/types";

import { Cell } from "data/Cell";
import { Param } from "data/common";

import "./CellView.scss";

interface Props extends CommonAttributes {
  cell: Cell;
  value: Param;
  onChange?: (cell: Cell, newValue: string) => void;
}

class CellView extends React.PureComponent<Props> {
  render() {
    const { className, cell, value } = this.props;
    const { top, left, bottom, right } = cell.rect;
    const style = {
      gridArea: [top, left, bottom, right].map(val => val + 1).join(" / "),
    };
    const message = (typeof value === "object" && value.message) || "";
    return (
      <div
        style={style}
        className={classnames("cellView", className)}
        title={message}
      >
        {cell.terminal.sign === "+" ? (
          <input
            className="cellView-content"
            defaultValue={`${value}`}
            onChange={this.onChange}
          />
        ) : (
          <div className="cellView-content mod-readonly">{value}</div>
        )}
      </div>
    );
  }

  private onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.cell, ev.target.value);
    }
  };
}

export { CellView, Props };
