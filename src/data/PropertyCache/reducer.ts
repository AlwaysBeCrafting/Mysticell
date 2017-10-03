import { Action, ActionTypes } from "./actions";
import { PropertyCache } from "./model";


const reducer = (state: PropertyCache = {}, action: Action): PropertyCache => {
	switch (action.type) {
		case ActionTypes.SET_PARAMS: {
			return  {
				...state,
				[action.payload.propertyId]: action.payload.params,
			};
		}
		default: return state;
	}
};


export { reducer };
