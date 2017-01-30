import * as fields from "redux/actions/fields";
import { FieldState } from "redux/state";

const initialState: Map<number, FieldState> = new Map();

export const reducer = (
	state = initialState,
	action: fields.Actions,
): Map<number, FieldState> => {
	switch ( action.type ) {

		case fields.ActionTypes.EXPAND_FIELD:
			const expandingField = state.get( action.payload.fieldId );
			if ( !expandingField ) { return state; }
			return new Map( state ).set( expandingField.id, { ...expandingField, expanded: true } );

		case fields.ActionTypes.COLLAPSE_FIELD:
			const collapsingField = state.get( action.payload.fieldId );
			if ( !collapsingField ) { return state; }
			return new Map( state ).set( collapsingField.id, { ...collapsingField, expanded: false } );

		default: return state;
	}
};
