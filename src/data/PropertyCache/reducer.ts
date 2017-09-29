import { Action, ActionTypes } from "./actions";
import { PropertyCache } from "./model";


const reducer = (state: PropertyCache = {}, action: Action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_OUTPUT_VALUES: {
			return state;
		}
		default: return state;
	}
};


export {reducer};
