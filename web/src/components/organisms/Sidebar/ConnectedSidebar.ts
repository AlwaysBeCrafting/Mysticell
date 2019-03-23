import { connect, Dispatch } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Document } from "data/Document";
import { listSources } from "data/Source";

import { Sidebar, Props } from "./Sidebar";

type StateProps = Pick<Props, "document" | "sources">;
type DispatchProps = Pick<Props, "listSources">;
type InheritedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & InheritedProps;

interface ReduxProps {
  documentId: string;
}
type OwnProps = InheritedProps & ReduxProps;

const mapStateToProps = (state: App, ownProps: OwnProps): StateProps => ({
  document: state.documents.getEntity(ownProps.documentId, new Document()),
  sources: state.sources,
});

const mapDispatchToProps = (
  dispatch: Dispatch<App>,
  ownProps: OwnProps,
): DispatchProps => ({
  listSources: () => dispatch(listSources(ownProps.documentId)),
});

const mergeProps = (
  { document, sources }: StateProps,
  { listSources }: DispatchProps,
  { className }: OwnProps,
): MergedProps => ({
  document,
  sources,
  listSources,
  className,
});

const ConnectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Sidebar);

export { ConnectedSidebar };
