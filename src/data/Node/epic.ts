import { ActionsObservable } from "redux-observable";

import "common/rxjs";

import { Action, ActionTypes, setUserValue } from "./actions";


const userValueEpic = (action$: ActionsObservable<Action>) => action$
	.ofType(ActionTypes.SET_USER_VALUE_ASYNC)
	.debounceTime(300)
	.map(action => action.type === ActionTypes.SET_USER_VALUE_ASYNC
		? setUserValue(
			action.payload.nodeId,
			action.payload.index,
			action.payload.value,
		)
		: action,
	);


export { userValueEpic };
