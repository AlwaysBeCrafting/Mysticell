import AppState from 'state';
import Action from 'state/actions';

export interface ExpandFieldAction {
	type: 'EXPAND_FIELD';
	fieldId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'EXPAND_FIELD' ) { return state; }

	const field = {
		...state.fields.get( action.fieldId ),
		expanded: true,
	};

	return {
		...state,
		fields: new Map( state.fields ).set( field.id, field ),
	};
};

export default ( fieldId: number ): ExpandFieldAction => ({
	type: 'EXPAND_FIELD',
	fieldId,
});
