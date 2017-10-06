import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { setParams } from "data/PropertyCache";
import { resolveProperty } from "data/utils";

import { Action, ActionTypes } from "./actions";


const initPropertyCacheEpic = (action$: ActionsObservable<Action>) => action$
	.ofType(ActionTypes.LOAD_DOCUMENT)
	.mergeMap(({ payload: { documentJson }}) => (
		Observable.of(...Object.values(documentJson.formulas))
			.filter(formula => formula.isProperty)
			.mergeMap(property => {
				const result = resolveProperty(documentJson, property.id)
					.then(params => setParams(property.id, params));
				return result;
			})
	));


export { initPropertyCacheEpic };
