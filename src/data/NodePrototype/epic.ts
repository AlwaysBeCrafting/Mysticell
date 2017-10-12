import Redux from "redux";
import { ActionsObservable, combineEpics } from "redux-observable";

import { Observable } from "common/rxjs";

import { AppState } from "data/AppState";
import { resolveGraph } from "data/Graph";
import { isProperty } from "data/NodePrototype";
import { setParams } from "data/PropertyCache";

import { Action, ActionTypes, setPropertyInputValue } from "./actions";


const changePropertyInputValueEpic = (
	action$: ActionsObservable<Action>,
): Observable<Redux.Action> => action$
	.ofType(ActionTypes.CHANGE_PROPERTY_INPUT_VALUE_ASYNC)
	.debounceTime(300)
	.map(action => {
		const { propertyId, index, value } = action.payload;
		return setPropertyInputValue(propertyId, index, value);
	});

const setPropertyCacheParamsEpic = (
	action$: ActionsObservable<Action>,
	store: Redux.Store<AppState>,
): Observable<Redux.Action>  => action$
	.ofType(ActionTypes.CHANGE_PROPERTY_INPUT_VALUE)
	.mergeMap(async action => {
		const { propertyId } = action.payload;
		const { nodePrototypes } = store.getState().document;
		const property = nodePrototypes[propertyId];
		if (!isProperty(property)) {
			throw new Error(`Cannot cache calculated values of non-property ${propertyId}`);
		}
		const newValues = await resolveGraph(
			nodePrototypes,
			property,
		);
		return setParams(propertyId, newValues);
	});

const epic = combineEpics(
	changePropertyInputValueEpic,
	setPropertyCacheParamsEpic,
);


export { epic };
