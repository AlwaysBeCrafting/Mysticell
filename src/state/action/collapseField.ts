import AppState from 'state';
import Action from 'state/action';

export interface CollapseFieldAction {
	type: 'COLLAPSE_FIELD';
	fieldId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'COLLAPSE_FIELD' ) { return state; }

	const field = {
		...state.fields.get( action.fieldId ),
		expanded: false,
	};

	return {
		...state,
		fields: new Map( state.fields ).set( field.id, field ),
	};
};

export default ( fieldId: number ): CollapseFieldAction => ({
	type: 'COLLAPSE_FIELD',
	fieldId,
});
