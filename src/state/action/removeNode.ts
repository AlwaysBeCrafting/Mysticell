import AppState, { NodeState } from 'state';
import Action from 'state/action';

export interface RemoveNodeAction {
	type: 'REMOVE_NODE';
	nodeId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'REMOVE_NODE' ) { return state; }

	const disconnectedNodes = Array.from( state.nodes )
		.filter(( [nodeId, node] ) => nodeId !== action.nodeId )
		.map(( [nodeId, node] ) => ({
				...node,
				inputNodes: node.inputNodes.filter( inputId => inputId !== action.nodeId ),
			}))
		.reduce(
			( acc, node ) => acc.set( node.id, node ),
			new Map() );

	const disconnectedFormulas = Array.from( state.fields )
		.map(( [fieldId, field]) => ({
			...field,
			nodes: field.nodes.filter( nodeId => nodeId !== action.nodeId ),
		}))
		.reduce(
			( acc, formula ) => acc.set( formula.id, formula ),
			new Map() );

	return {
		...state,
		nodes: disconnectedNodes,
		formulas: disconnectedFormulas,
	};
};



export default ( nodeId: number ): RemoveNodeAction => ({
	type: 'REMOVE_NODE',
	nodeId,
});
