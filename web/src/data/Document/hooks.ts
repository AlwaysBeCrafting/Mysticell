import { useStore } from "data/store";

const useDocumentList = () => {
  const [state] = useStore();
  return [state.documents.toEntitySeq().toSet(), {}];
};

const useDocument = (documentId: string) => {
  const [state] = useStore();
  return [state.documents.getEntity(documentId), {}];
};

export { useDocumentList, useDocument };
