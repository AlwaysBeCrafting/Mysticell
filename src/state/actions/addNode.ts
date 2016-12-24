import AppState, { NodeState } from 'state';
import Action from 'state/actions';

export interface AddNodeAction {
	type: 'ADD_NODE';
	fieldId: number;
	fxn: string;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'ADD_NODE' ) { return state; }

	const formula = state.formulas.get( action.fieldId );
	if ( !formula ) { return state; }

	const nodeId = Math.floor( Math.random() * 1000000 );

	const node = {
		id:         nodeId,
		fxn:        action.fxn,
		inputNodes: [],
		label:      'Add',
		position:   { x: 0, y: 0 },
	};

	const formulaClone = {
		...formula,
		nodes: [ ...formula.nodes, nodeId ],
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( node.id, node ),
		formulas: new Map( state.formulas ).set( action.fieldId, formulaClone ),
	};
};



export default ( fieldId: number, fxn: string ): AddNodeAction => ({
	type: 'ADD_NODE',
	fieldId,
	fxn,
});
