import { List } from "immutable";
import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";

import { Tabletop, Props } from "./Tabletop";

type StateProps = Pick<Props, "sheetIds">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (_: App, __: PublicProps): StateProps => ({
  sheetIds: List(),
});

const mergeProps = (
  { sheetIds }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ sheetIds, className });

const ConnectedTabletop = connect(
  mapStateToProps,
  {},
  mergeProps,
)(Tabletop);

export { ConnectedTabletop };
