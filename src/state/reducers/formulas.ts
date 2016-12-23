import { FormulaState } from 'state';
import Action, { AddNodeAction } from 'state/action';

export default ( formulas: Map<number, FormulaState> = new Map(), action: Action ) => {
	if ( action.type !== 'ADD_NODE' ) { return formulas; }

	const formula = formulas.get( action.fieldId );
	if ( !formula ) { return formulas; }

	const formulaClone = {
		...formula,
		nodes: [ ...formula.nodes, action.nodeId ],
	};

	return formulas;
};
