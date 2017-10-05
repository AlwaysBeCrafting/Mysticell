import Redux from "redux";
import { ActionsObservable } from "redux-observable";

import { AppState } from "data/AppState";
import { PARAMS } from "data/common";
import { setParams } from "data/PropertyCache";
import { resolveProperty } from "data/utils";

import { Action, ActionTypes, setValue } from "./actions";


const setPropertyInputEpic = (action$: ActionsObservable<Action>) => action$
	.ofType(ActionTypes.SET_VALUE_ASYNC)
	.debounceTime(300)
	.map(action => {
		if (action.type === ActionTypes.SET_VALUE_ASYNC) {
			return setValue(
				action.payload.propertyId,
				action.payload.index,
				action.payload.value,
			);
		}
		return action;
	});

const updatePropertyCacheEpic = (action$: ActionsObservable<Action>, store: Redux.Store<AppState>) => action$
	.ofType(ActionTypes.SET_VALUE)
	.mergeMap(action => {
		if (action.type === ActionTypes.SET_VALUE) {
			const { document } = store.getState();
			const inputs = store.getState().document.propertyInputs[action.payload.propertyId];
			return (
				resolveProperty(
					document,
					action.payload.propertyId,
					...inputs.map(input => PARAMS.string(input)),
				)
					.then(params => setParams(action.payload.propertyId, params))
			);
		}
		return [];
	});


export { setPropertyInputEpic, updatePropertyCacheEpic };
