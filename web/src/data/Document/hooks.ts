import { useSelector, useDispatch } from "react-redux";

import { App } from "~/data/App";
import { clientRequest } from "~/data/client";

import { Document } from "./model";
import { ActionTypes, Action } from "./actions";

const useDocumentList = () => {
  const documents = useSelector((state: App) =>
    state.documents.toEntitySeq().toSet(),
  );
  const dispatch = useDispatch();
  const actions = {
    insert: (document: Document): Action => ({
      type: ActionTypes.INSERT,
      payload: { document },
    }),
    fetch: () => dispatch(clientRequest(ActionTypes.LIST, "GET", "documents")),
  };
  return [documents, actions] as const;
};

const useDocument = (documentId: string) => {
  const document = useSelector((state: App) =>
    state.documents.getEntity(documentId, new Document()),
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: () =>
      dispatch(
        clientRequest(ActionTypes.GET, "GET", `documents/${documentId}`),
      ),
  };
  return [document, actions] as const;
};

export { useDocumentList, useDocument };
