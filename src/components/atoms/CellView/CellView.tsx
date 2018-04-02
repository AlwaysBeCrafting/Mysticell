import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { AppState } from "data/AppState";
import { Cell } from "data/Cell";
import { Param } from "data/common";

import "./CellView.scss";

interface OwnProps {
  className?: string;
  cellId: string;
  onChange?: (cell: Cell, newValue: string) => void;
}

interface StateProps {
  cell: Cell;
  value: Param;
}

type Props = OwnProps & StateProps;

class PartialCellView extends React.PureComponent<Props> {
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

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => {
  const cell = state.entities.cells.get(props.cellId, new Cell());
  return {
    cell,
    value: state.entities.propertyValues.get(cell.terminal, ""),
  };
};

const CellView = connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
  PartialCellView,
);

export { CellView };
