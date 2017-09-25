import {UiState} from "./model";


type Action = any;

const defaultState: UiState = {
	expandedNavItems: new Set(["NAV-0001"]),
};

const reducer = (state: UiState = defaultState, action: Action): UiState => {
	switch (action.type) {
		default: return state;
	}
};


export {reducer};
