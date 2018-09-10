import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Document } from "data/Document";

import { DocumentPage, Props } from "./DocumentPage";

type StateProps = Pick<Props, "name" | "sheets" | "sources" | "idFromPath">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => ({
  name: state.documents.getEntity(props.documentId, new Document()).name,
  sheets: state.sheets,
  sources: state.sources,
  /* TODO I think this will cause a lot of useless re-renders??? */
  idFromPath: () => "",
});

const mergeProps = (
  { name, sheets, sources, idFromPath }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ name, sheets, sources, idFromPath, className });

const ConnectedDocumentPage = connect(
  mapStateToProps,
  {},
  mergeProps,
)(DocumentPage);

export { ConnectedDocumentPage };
