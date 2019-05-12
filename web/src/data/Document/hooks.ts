import { useSelector, useDispatch } from "react-redux";

import { App } from "data/App";

import { Document } from "./model";
import { listDocuments, getDocument } from "./actions";

const useDocumentList = () => {
  const documents = useSelector((state: App) =>
    state.documents.toEntitySeq().toSet(),
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: () => dispatch(listDocuments()),
  };
  return [documents, actions] as const;
};

const useDocument = (documentId: string) => {
  const document = useSelector((state: App) =>
    state.documents.getEntity(documentId, new Document()),
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: () => dispatch(getDocument(documentId)),
  };
  return [document, actions] as const;
};

export { useDocumentList, useDocument };
