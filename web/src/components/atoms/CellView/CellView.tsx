import classNames from "classnames";
import React, { useCallback } from "react";

import { CommonAttributes } from "common/types";

import { Cell } from "data/Cell";
import { Param } from "data/common";

import "./CellView.scss";

interface Props extends CommonAttributes {
  cell: Cell;
  value: Param;
  onChange?: (cell: Cell, newValue: string) => void;
}

const CellView = (props: Props) => {
  const { className, cell, value } = props;
  const { top, left, bottom, right } = cell.rect;
  const style = {
    gridArea: [top, left, bottom, right].map(val => val + 1).join(" / "),
  };
  const message = (typeof value === "object" && value.message) || "";

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(cell, ev.target.value);
      }
    },
    [props.onChange, cell],
  );

  return (
    <div
      style={style}
      className={classNames("CellView", className)}
      title={message}
    >
      {cell.sign === "+" ? (
        <input
          className="CellView-content"
          defaultValue={`${value}`}
          onChange={onChange}
        />
      ) : (
        <div className="CellView-content mod-readonly">{value}</div>
      )}
    </div>
  );
};

export { CellView, Props };
