import AppState, { FieldState } from 'state';
import Action from 'state/action';
import { fieldPath } from 'state/field';

export interface SetPathToFormulaAction {
	type: 'SET_PATH_TO_FORMULA';
	fieldId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SET_PATH_TO_FORMULA' ) { return state; }

	return {
		...state,
		path: fieldPath( action.fieldId, state.fields ),
	};
};

export default ( fieldId: number ): SetPathToFormulaAction => ({
	type: 'SET_PATH_TO_FORMULA',
	fieldId,
});
