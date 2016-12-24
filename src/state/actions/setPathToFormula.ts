import AppState, { FieldState } from 'state';
import Action from 'state/actions';

export interface SetPathToFormulaAction {
	type: 'SET_PATH_TO_FORMULA';
	fieldId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SET_PATH_TO_FORMULA' ) { return state; }

	const fieldParent = ( id: number ): number | undefined => {
		const parent = Array.from( state.fields )
			.find( entry =>  !!entry[1].children
				.find( childId => childId === id ),
			);
		return parent && parent[0];
	};

	const fieldPath = ( id: number ): string[] => {
		const parent = fieldParent( id );
		const field = state.fields.get( id );
		return [
			...(( parent && fieldPath( parent )) || [] ),
			...(( field && [field.name] ) || [] ),
		];
	};

	return {
		...state,
		path: fieldPath( action.fieldId ),
	};
};

export default ( fieldId: number ): SetPathToFormulaAction => ({
	type: 'SET_PATH_TO_FORMULA',
	fieldId,
});
