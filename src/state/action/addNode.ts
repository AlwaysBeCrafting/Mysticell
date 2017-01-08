import AppState, { NodeState } from 'state';
import Action from 'state/action';

export interface AddNodeAction {
	type: 'ADD_NODE';
	fieldId: number;
	node: NodeState;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'ADD_NODE' ) { return state; }

	const { fieldId, node } = action;

	const field = state.fields.get( action.fieldId );
	if ( !field ) { return state; }

	const fieldClone = {
		...field,
		nodes: [ ...field.nodes, node.id ],
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( node.id, node ),
		fields: new Map( state.fields ).set( action.fieldId, fieldClone ),
	};
};



export default ( fieldId: number, node: NodeState ): AddNodeAction => ({
	type: 'ADD_NODE',
	fieldId,
	node,
});
