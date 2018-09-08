import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { AppState } from "data/AppState";
import { Document } from "data/Document";

import { Sidebar, Props } from "./Sidebar";

type StateProps = Pick<
  Props,
  "document" | "directories" | "sources" | "entityParents"
>;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: AppState, props: PublicProps): StateProps => ({
  document: state.entities.documents.get(props.documentId, new Document()),
  directories: state.entities.directories,
  sources: state.entities.sources,
  entityParents: state.entities.entityParents,
});

const mergeProps = (
  { document, directories, sources, entityParents }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({
  document,
  directories,
  sources,
  entityParents,
  className,
});

const ConnectedSidebar = connect(
  mapStateToProps,
  {},
  mergeProps,
)(Sidebar);

export { ConnectedSidebar };
