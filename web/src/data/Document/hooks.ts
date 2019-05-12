import { tuple, useStore } from "common/utils";
import { App } from "data/App";

import { listDocuments, getDocument } from "./actions";

const useDocumentList = () => {
  const [state, dispatch] = useStore<App>();
  return tuple(state.documents.toEntitySeq().toSet(), {
    fetch: () => dispatch(listDocuments()),
  });
};

const useDocument = (documentId: string) => {
  const [state, dispatch] = useStore<App>();
  return tuple(state.documents.getEntity(documentId), {
    fetch: () => dispatch(getDocument(documentId)),
  });
};

export { useDocumentList, useDocument };
