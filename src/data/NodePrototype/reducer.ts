import { Dict } from "common/types";

import { Action, ActionTypes } from "./actions";
import { isProperty, NodePrototype } from "./model";


const reducer = (state: Dict<NodePrototype> = {}, action: Action) => {
	switch (action.type) {
		case ActionTypes.CHANGE_PROPERTY_INPUT_VALUE: {
			const { propertyId, index, value } = action.payload;
			const oldProperty = state[propertyId];
			if (!isProperty(oldProperty)) {
				throw new Error(`Cannot change input values on non-property ${propertyId}`);
			}
			const newInputValues = [...oldProperty.inputValues];
			newInputValues[index] = value;
			const newProperty = {
				...oldProperty,
				inputValues: newInputValues,
			};
			return {
				...state,
				[propertyId]: newProperty,
			};
		}
		default: return state;
	}
};


export { reducer };
