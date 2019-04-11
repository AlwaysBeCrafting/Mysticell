import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { listSheets } from "data/Sheet";

import { Tabletop, Props } from "./Tabletop";

type StateProps = Pick<Props, "sheets">;
type DispatchProps = Pick<Props, "listSheets">;
type InheritedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & InheritedProps;

interface ReduxProps {
  documentId: string;
}
type OwnProps = InheritedProps & ReduxProps;

const mapStateToProps = (state: App, __: OwnProps): StateProps => ({
  sheets: state.sheets,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => ({
  listSheets: () => dispatch(listSheets(ownProps.documentId)),
});

const mergeProps = (
  { sheets }: StateProps,
  { listSheets }: DispatchProps,
  { className }: OwnProps,
): MergedProps => ({ sheets, listSheets, className });

const ConnectedTabletop = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Tabletop);

export { ConnectedTabletop };
