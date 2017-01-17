import { NodeState } from 'state';

export const resolveNode = ( node: NodeState, nodes: Map<number, NodeState> ): string|number => {
	const inputs = node.fxn.inputNames
		.map(( inputName, i ) => {
			const inputNode = nodes.get( node.inputNodes[i] );
			return inputNode ?
				resolveNode( inputNode, nodes ) :
				node.inputValues[i];
		});

	const output = node.fxn.exec( ...inputs );

	return output;
};
