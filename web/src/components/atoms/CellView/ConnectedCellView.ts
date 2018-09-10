import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Cell } from "data/Cell";

import { CellView, Props } from "./CellView";

type StateProps = Pick<Props, "cell" | "value">;
type DispatchProps = {};
type PassedProps = CommonAttributes & Pick<Props, "onChange">;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  cellId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => {
  const cell = state.cells.getEntity(props.cellId, new Cell());
  const value = "";
  return { cell, value };
};

const mergeProps = (
  { cell, value }: StateProps,
  {  }: DispatchProps,
  { className, onChange }: PublicProps,
): MergedProps => ({ cell, value, className, onChange });

const ConnectedCellView = connect(
  mapStateToProps,
  {},
  mergeProps,
)(CellView);

export { ConnectedCellView };
