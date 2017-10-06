import Redux from "redux";
import { ActionsObservable } from "redux-observable";

import { AppState } from "data/AppState";
import { setParams } from "data/PropertyCache";
import { resolveProperty } from "data/utils";

import { Action, ActionTypes, setValue } from "./actions";


const setPropertyInputEpic = (action$: ActionsObservable<Action>) => action$
	.ofType(ActionTypes.SET_VALUE_ASYNC)
	.debounceTime(300)
	.map(action => setValue(
		action.payload.propertyId,
		action.payload.index,
		action.payload.value,
	));

const updatePropertyCacheEpic = (action$: ActionsObservable<Action>, store: Redux.Store<AppState>) => action$
	.ofType(ActionTypes.SET_VALUE)
	.mergeMap(action => {
		const { document } = store.getState();
		return (
			resolveProperty(document, action.payload.propertyId)
				.then(params => setParams(action.payload.propertyId, params))
		);
	});


export { setPropertyInputEpic, updatePropertyCacheEpic };
