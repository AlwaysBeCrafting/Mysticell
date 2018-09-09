import { Epic } from "redux-observable";

import { App, Action } from "data/App";

const epic: Epic<Action, App> = $action => $action;

export { epic };
