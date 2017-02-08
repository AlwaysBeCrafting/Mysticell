import { Field } from "common/types";


class ActionTypes {
	static readonly EXPAND_FIELD = "[Field] Expand";
	static readonly COLLAPSE_FIELD = "[Field] Collapse";
}


class ExpandFieldAction {
	readonly type = ActionTypes.EXPAND_FIELD;
	constructor ( public payload: { fieldId: number }) {};
}
export const expandField = ( fieldId: number ): ExpandFieldAction => ({
	...new ExpandFieldAction({ fieldId }),
});

class CollapseFieldAction {
	readonly type = ActionTypes.COLLAPSE_FIELD;
	constructor ( public payload: { fieldId: number }) {}
}
export const collapseField = ( fieldId: number ): CollapseFieldAction => ({
	...new CollapseFieldAction({ fieldId }),
});


export type Action = ExpandFieldAction | CollapseFieldAction;


type FieldMap = Map<number, Field>;

export default ( state = new Map(), action: Action ): FieldMap => {
	switch ( action.type ) {

		case ActionTypes.EXPAND_FIELD:
			const expandingField = state.get( action.payload.fieldId );
			if ( !expandingField ) { return state; }
			return new Map( state ).set( expandingField.id, { ...expandingField, expanded: true } );

		case ActionTypes.COLLAPSE_FIELD:
			const collapsingField = state.get( action.payload.fieldId );
			if ( !collapsingField ) { return state; }
			return new Map( state ).set( collapsingField.id, { ...collapsingField, expanded: false } );

		default: return state;
	}
};
