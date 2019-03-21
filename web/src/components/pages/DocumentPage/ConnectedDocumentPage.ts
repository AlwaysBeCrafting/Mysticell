import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Document } from "data/Document";

import { DocumentPage, Props } from "./DocumentPage";

type StateProps = Pick<
  Props,
  "name" | "sheets" | "sources" | "idFromPath" | "documentId" | "path"
>;
type DispatchProps = {};
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

const mergeProps = (
  { name, sheets, sources, idFromPath, documentId, path }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({
  name,
  sheets,
  sources,
  idFromPath,
  className,
  documentId,
  path,
});

const ConnectedDocumentPage = connect(
  mapStateToProps,
  {},
  mergeProps,
)(DocumentPage);

export { ConnectedDocumentPage };
