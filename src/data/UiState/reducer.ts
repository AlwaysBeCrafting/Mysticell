import { Action, ActionTypes } from "./actions";
import { UiState } from "./model";


const defaultState: UiState = {
	expandedNavItems: new Set(["root/Abilities"]),
};

const reducer = (state: UiState = defaultState, action: Action): UiState => {
	switch (action.type) {
		case ActionTypes.COLLAPSE_ALL_NAV_ITEMS: {
			return ({
				...state,
				expandedNavItems: new Set(),
			});
		}
		case ActionTypes.EXPAND_NAV_ITEM: {
			const expandedNavItems = new Set(state.expandedNavItems);
			expandedNavItems.add(action.payload.path);
			return ({
				...state,
				expandedNavItems,
			});
		}
		case ActionTypes.TOGGLE_NAV_ITEM: {
			const expandedNavItems = new Set(state.expandedNavItems);
			if (expandedNavItems.has(action.payload.path)) {
				expandedNavItems.delete(action.payload.path);
			} else {
				expandedNavItems.add(action.payload.path);
			}
			return({
				...state,
				expandedNavItems,
			});
		}
		default: return state;
	}
};


export {reducer};
