import { connect, Dispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Document, getDocument } from "data/Document";

import { DocumentPage, Props } from "./DocumentPage";

type StateProps = Pick<
  Props,
  "name" | "sheets" | "sources" | "idFromPath" | "documentId" | "path"
>;
type DispatchProps = Pick<Props, "getDocument">;
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

type PublicProps = PassedProps & ReduxProps & RouteProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => ({
  name: state.documents.getEntity(props.documentId, new Document()).name,
  sheets: state.sheets,
  sources: state.sources,
  idFromPath: () => "",
  documentId: props.match.params.documentId,
  path: props.match.params.path,
});

const mapDispatchToProps = (
  dispatch: Dispatch<App>,
  ownProps: PublicProps,
): DispatchProps => ({
  getDocument: () => dispatch(getDocument(ownProps.match.params.documentId)),
});

const mergeProps = (
  { name, sheets, sources, idFromPath, documentId, path }: StateProps,
  { getDocument }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({
  name,
  sheets,
  sources,
  idFromPath,
  className,
  documentId,
  path,
  getDocument,
});

const ConnectedDocumentPage = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DocumentPage);

export { ConnectedDocumentPage };
