import {UiState} from "./model";


type Action = any;

const defaultState: UiState = {
	expandedNavItems: new Set().add("/Abilities"),
};

const reducer = (state: UiState = defaultState, action: Action): UiState => {
	switch (action.type) {
		default: return state;
	}
};


export {reducer};
