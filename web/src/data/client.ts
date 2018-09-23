import { Action } from "redux";
import { Epic } from "redux-observable";

import { App } from "data/App";

const enum ActionTypes {
  RESPONSE = "[Client] Response",
}

interface ClientRequestAction extends Action {
  path: string;
  requestInit: RequestInit;
}
const clientRequest = (
  type: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: {},
): ClientRequestAction => ({
  type,
  path,
  requestInit: {
    method,
    body: JSON.stringify(body),
  },
});

interface ClientResponseAction extends Action {
  type: ActionTypes.RESPONSE;
  originalType: string;
  response: Response;
  json: any;
}

const apiUrl = (path: string) =>
  `http://${process.env.FRONTEND_API_HOST}:${
    process.env.FRONTEND_API_PORT
  }/${path}`;

const clientEpic: Epic<Action, App> = action$ =>
  action$
    .filter((action: ClientRequestAction) => !!action.path && !!action.requestInit)
    .mergeMap(
      async (action: ClientRequestAction): Promise<ClientResponseAction> => {
        const response = await fetch(apiUrl(action.path), action.requestInit);
        return {
          type: ActionTypes.RESPONSE,
          originalType: action.type,
          response,
          json: await response.json(),
        };
      },
    );

export { ActionTypes, ClientRequestAction, ClientResponseAction };
export { clientRequest, clientEpic };
