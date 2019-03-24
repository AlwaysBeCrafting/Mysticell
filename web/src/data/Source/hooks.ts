import { useStore } from "data/store";
import { tuple } from "common/utils";

const useSourceList = (documentId: string) => {
  const [state] = useStore();
  return tuple(
    state.documentSources
      .getRelated(documentId)
      .map(sourceId => state.sources.getEntity(sourceId)),
    {},
  );
};

const useSource = (sourceId: string) => {
  const [state] = useStore();
  return tuple(state.sources.getEntity(sourceId), {});
};

export { useSourceList, useSource };
