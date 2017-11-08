import classnames from "classnames";
import React from "react";

import { Rect } from "common/types";

import { Cell } from "data/Cell";
import { Param } from "data/common";

import "./CellView.scss";

interface Props {
  className?: string;
  cell: Cell;
  param: Param;
  rect: Rect;
  onChange?: (cell: Cell, newValue: string) => void;
  readonly?: boolean;
}

class CellView extends React.PureComponent<Props> {
  render() {
    const { className, param, rect, readonly } = this.props;
    const style = {
      gridArea: [rect.top, rect.left, rect.bottom, rect.right]
        .map(val => val + 1)
        .join(" / "),
    };
    const message = param.type === "error" ? param.message : "";
    return (
      <div
        style={style}
        className={classnames("cellView", className)}
        title={message}
      >
        {readonly ? (
          <div className="cellView-content">{param.value}</div>
        ) : (
          <input
            className="cellView-content mod-input"
            defaultValue={`${param.value}`}
            onChange={this.onChange}
          />
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

export { CellView };
