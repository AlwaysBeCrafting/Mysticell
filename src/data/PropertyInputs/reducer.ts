import { Action, ActionTypes } from "./actions";
import { PropertyInputs } from "./model";


const defaultState: PropertyInputs = {};
const reducer = (state: PropertyInputs = defaultState, action: Action): PropertyInputs => {
	switch (action.type) {
		case ActionTypes.SET_VALUE: {
			const { propertyId, index, value } = action.payload;
			const newInputs = [...state[propertyId]];
			newInputs[index] = value;
			return {
				...state,
				[propertyId]: newInputs,
			};
		}
		default: {
			return state;
		}
	}
};


export { reducer };
