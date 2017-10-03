import { ActionsObservable } from "redux-observable";

import "common/rxjs";

import { Action, ActionTypes, setValue } from "./actions";


const setPropertyInputEpic = (action$: ActionsObservable<Action>) => action$
	.ofType(ActionTypes.SET_VALUE_ASYNC)
	.debounceTime(300)
	.map(action => action.type === ActionTypes.SET_VALUE_ASYNC
		? setValue(
			action.payload.propertyId,
			action.payload.index,
			action.payload.value,
		)
		: action,
	);


export { setPropertyInputEpic };
