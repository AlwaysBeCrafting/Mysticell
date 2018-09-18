import { List } from "immutable";
import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Sheet } from "data/Sheet";

import { SheetView, Props } from "./SheetView";

type StateProps = Pick<Props, "sheet" | "cellIds">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  sheetId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => ({
  cellIds: List(),
  sheet: state.sheets.getEntity(props.sheetId, new Sheet()),
});

const mergeProps = (
  { sheet, cellIds }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ sheet, cellIds, className });

const ConnectedSheetView = connect(
  mapStateToProps,
  {},
  mergeProps,
)(SheetView);

export { ConnectedSheetView };
