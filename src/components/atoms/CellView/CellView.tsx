import classnames from "classnames";
import React from "react";

import { Rect2d } from "common/types";

import { Cell } from "data/Cell";
import { Param } from "data/common";

import "./CellView.scss";

interface Props {
  className?: string;
  cell: Cell;
  param: Param;
  rect: Rect2d;
  onChange?: (cell: Cell, newValue: string) => void;
}
class CellView extends React.PureComponent<Props> {
  public render() {
    const { className, param, rect, onChange } = this.props;
    const style = {
      gridArea: [rect.top, rect.left, rect.bottom, rect.right]
        .map(val => val + 1)
        .join(" / "),
    };
    const content = onChange ? (
      <input
        className="cellView-content mod-input"
        defaultValue={`${param.value}`}
        onChange={this.onChange}
      />
    ) : (
      <div className="cellView-content">{param.value}</div>
    );
    return (
      <div style={style} className={classnames("cellView", className)}>
        {content}
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
