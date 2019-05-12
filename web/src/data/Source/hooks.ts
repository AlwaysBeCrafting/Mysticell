import { List } from "immutable";
import { useSelector } from "react-redux";

import { App } from "data/App";
import { Source } from "./model";

const useSourceList = (documentId: string) => {
  const sources = useSelector(
    (state: App) => state.documentSources.get(documentId, List<string>()),
    [documentId],
  );
  const actions = {};
  return [sources, actions] as const;
};

const useSource = (sourceId: string) => {
  const source = useSelector(
    (state: App) => state.sources.getEntity(sourceId, new Source()),
    [sourceId],
  );
  const actions = {};
  return [source, actions] as const;
};

export { useSourceList, useSource };
