import { List } from "immutable";
import { useSelector, useDispatch } from "react-redux";

import { App } from "~/data/App";
import { clientRequest } from "~/data/client";

import { Source } from "./model";
import { ActionTypes } from "./actions";

const useSourceList = (documentId: string) => {
  const sources = useSelector(
    (state: App) => state.documentSources.get(documentId, List<string>()),
    [documentId],
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: () =>
      dispatch(
        clientRequest(
          ActionTypes.LIST,
          "GET",
          `documents/${documentId}/sources`,
        ),
      ),
    insert: (source: Source) =>
      dispatch({
        type: ActionTypes.INSERT,
        payload: { source },
      }),
  };
  return [sources, actions] as const;
};

const useSource = (sourceId: string) => {
  const source = useSelector(
    (state: App) => state.sources.getEntity(sourceId, new Source()),
    [sourceId],
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: (documentId: string) =>
      dispatch(
        clientRequest(
          ActionTypes.GET,
          "GET",
          `documents/${documentId}/sources/${sourceId}`,
        ),
      ),
  };
  return [source, actions] as const;
};

export { useSourceList, useSource };
