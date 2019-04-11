import { Action, AnyAction } from "redux";
import { Epic } from "redux-observable";
import { filter, mergeMap } from "rxjs/operators";

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

const isClientRequestAction = (a: AnyAction): a is ClientRequestAction =>
  !!a.path && !!a.requestInit;

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

const clientEpic: Epic<AnyAction> = action$ =>
  action$.pipe(
    filter(isClientRequestAction),
    mergeMap(
      async (action): Promise<ClientResponseAction> => {
        const response = await fetch(apiUrl(action.path), action.requestInit);
        return {
          type: ActionTypes.RESPONSE,
          originalType: action.type,
          response,
          json: await response.json(),
        };
      },
    ),
  );

export { ActionTypes, ClientRequestAction, ClientResponseAction };
export { clientRequest, clientEpic };
