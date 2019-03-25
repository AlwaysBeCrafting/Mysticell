import { tuple, useStore } from "common/utils";
import { App } from "data/App";

const useSourceList = (documentId: string) => {
  const [state] = useStore<App>();
  return tuple(
    state.documentSources
      .getRelated(documentId)
      .map(sourceId => state.sources.getEntity(sourceId)),
    {},
  );
};

const useSource = (sourceId: string) => {
  const [state] = useStore<App>();
  return tuple(state.sources.getEntity(sourceId), {});
};

export { useSourceList, useSource };
