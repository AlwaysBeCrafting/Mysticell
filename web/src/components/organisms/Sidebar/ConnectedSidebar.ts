import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Document } from "data/Document";

import { Sidebar, Props } from "./Sidebar";

type StateProps = Pick<Props, "document" | "directories" | "sources">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => ({
  document: state.documents.getEntity(props.documentId, new Document()),
  directories: state.directories,
  sources: state.sources,
});

const mergeProps = (
  { document, directories, sources }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({
  document,
  directories,
  sources,
  className,
});

const ConnectedSidebar = connect(
  mapStateToProps,
  {},
  mergeProps,
)(Sidebar);

export { ConnectedSidebar };
