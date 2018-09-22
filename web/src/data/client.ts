import { Action } from "redux";
import { Epic } from "redux-observable";

import { App } from "data/App";

const enum ActionTypes {
  RESPONSE = "[Client] Response",
}

interface ClientRequestAction extends Action, RequestInit {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
}

interface ClientResponseAction extends Action {
  type: ActionTypes.RESPONSE;
  originalType: string;
  response: Response;
  json: {};
}

const apiUrl = (path: string) =>
  `http://${process.env.API_HOST}:${process.env.API_PORT}/${path}`;

const clientEpic: Epic<Action, App> = action$ =>
  action$
    .filter((action: ClientRequestAction) => !!action.method && !!action.path)
    .mergeMap(
      async (action: ClientRequestAction): Promise<ClientResponseAction> => {
        const response = await fetch(apiUrl(action.path), action);
        return {
          type: ActionTypes.RESPONSE,
          originalType: action.type,
          response,
          json: response.json(),
        };
      },
    );

export { ClientRequestAction, ClientResponseAction };
export { clientEpic };
