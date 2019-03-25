import classNames from "classnames";
import React, { useCallback } from "react";

import { CommonAttributes } from "common/types";
import { Cell, useCell } from "data/Cell";

import "./CellView.scss";

interface Props extends CommonAttributes {
  cellId: string;
  onChange?: (cell: Cell, newValue: string) => void;
}

const CellView = (props: Props) => {
  const { className, cellId } = props;

  const [cell] = useCell(cellId);
  if (!cell) return null;

  const { top, left, bottom, right } = cell.rect;
  const style = {
    gridArea: [top, left, bottom, right].map(val => val + 1).join(" / "),
  };

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(cell, ev.target.value);
      }
    },
    [props.onChange, cell],
  );

  return (
    <div style={style} className={classNames("CellView", className)}>
      {cell.sign === "+" ? (
        <input
          className="CellView-content"
          defaultValue=""
          onChange={onChange}
        />
      ) : (
        <div className="CellView-content mod-readonly" />
      )}
    </div>
  );
};

export { CellView };
