import { Epic } from "redux-observable";

import "common/rxjs";

import { Action } from "./actions";
import { AppState } from "./model";

const epic: Epic<Action, AppState> = $action => $action.filter(_ => false);

export { epic };
