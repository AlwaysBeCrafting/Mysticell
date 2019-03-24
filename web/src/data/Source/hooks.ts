import { useStore } from "data/store";

const useSourceList = (documentId: string) => {
  const [state] = useStore();
  return [state.documentSources.getRelated(documentId), {}];
};

const useSource = (sourceId: string) => {
  const [state] = useStore();
  return [state.sources.getEntity(sourceId), {}];
};

export { useSourceList, useSource };
