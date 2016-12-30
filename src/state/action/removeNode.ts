import AppState, { NodeState } from 'state';
import Action from 'state/action';

export interface RemoveNodeAction {
	type: 'REMOVE_NODE';
	nodeId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'REMOVE_NODE' ) { return state; }

	const { nodeId } = action;

	const clonedNodes = new Map( state.nodes );
	clonedNodes.delete( nodeId );

	const clonedFormulas = new Map( state.formulas );
	const nodeFormula = Array.from( state.formulas )
		.find(( [formulaId, formula] ) => !!formula.nodes.find( nId => nId === nodeId ));
	if ( nodeFormula ) {
		const formula = { ...nodeFormula[1] };
		formula.nodes = [...formula.nodes];
		delete formula.nodes[formula.nodes.indexOf(nodeId)];
		clonedFormulas.set( formula.id, formula );
	}

	return {
		...state,
		nodes: clonedNodes,
		formulas: clonedFormulas,
	};
};



export default ( nodeId: number ): RemoveNodeAction => ({
	type: 'REMOVE_NODE',
	nodeId,
});
