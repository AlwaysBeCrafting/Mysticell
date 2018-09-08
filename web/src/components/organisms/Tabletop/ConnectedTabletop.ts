import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { AppState } from "data/AppState";

import { Tabletop, Props } from "./Tabletop";

type StateProps = Pick<Props, "sheetIds">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: AppState, props: PublicProps): StateProps => ({
  sheetIds: state.entities.sheetDocuments
    .filter(documentId => documentId === props.documentId)
    .keySeq(),
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
