import { useStore } from "data/store";
import { tuple } from "common/utils";

const useDocumentList = () => {
  const [state] = useStore();
  return tuple(state.documents.toEntitySeq().toSet(), {});
};

const useDocument = (documentId: string) => {
  const [state] = useStore();
  return tuple(state.documents.getEntity(documentId), {});
};

export { useDocumentList, useDocument };
