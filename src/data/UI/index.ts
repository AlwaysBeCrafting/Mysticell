import { Action } from "./actions";
import { UiState } from "./model";


const defaultState = {};

const reducer = (state: UiState = defaultState, action: Action): UiState => {
	switch (action.type) {
		default: return state;
	}
};


export { reducer };
