import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { AppState } from "data/AppState";
import { Document } from "data/Document";
import { bindIdFromPath } from "data/EntityState";

import { DocumentPage, Props } from "./DocumentPage";

type StateProps = Pick<Props, "name" | "sheets" | "sources" | "idFromPath">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  documentId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: AppState, props: PublicProps): StateProps => ({
  name: state.entities.documents.get(props.documentId, new Document()).name,
  sheets: state.entities.sheets,
  sources: state.entities.sources,
  /* TODO I think this will cause a lot of useless re-renders??? */
  idFromPath: bindIdFromPath(
    state.entities.directories.toSeq().concat(state.entities.sources),
    state.entities.entityParents,
  ),
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
