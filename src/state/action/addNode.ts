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

	const formula = state.formulas.get( action.fieldId );
	if ( !formula ) { return state; }

	const formulaClone = {
		...formula,
		nodes: [ ...formula.nodes, node.id ],
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( node.id, node ),
		formulas: new Map( state.formulas ).set( action.fieldId, formulaClone ),
	};
};



export default ( fieldId: number, node: NodeState ): AddNodeAction => ({
	type: 'ADD_NODE',
	fieldId,
	node,
});
