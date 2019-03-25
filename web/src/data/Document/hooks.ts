import { tuple, useStore } from "common/utils";
import { App } from "data/App";

const useDocumentList = () => {
  const [state] = useStore<App>();
  return tuple(state.documents.toEntitySeq().toSet(), {});
};

const useDocument = (documentId: string) => {
  const [state] = useStore<App>();
  return tuple(state.documents.getEntity(documentId), {});
};

export { useDocumentList, useDocument };
