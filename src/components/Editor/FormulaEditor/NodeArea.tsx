import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { connect as reduxConnect, Dispatch } from 'react-redux';

import { Position } from 'data/shared';
import AppState, { FormulaState, NodeState } from 'state';

import Types from './dndTypes';
import FunctionNode from './FunctionNode';
import Wire from './Wire';

import './NodeArea.less';

//==============================================================================

export interface NodeAreaProps {
	fieldId: number;
}

interface DroppableNodeAreaProps extends NodeAreaProps {
	connectDropTarget: ConnectDropTarget;
}

interface WrappedNodeAreaProps extends DroppableNodeAreaProps {
	nodes: Map<number, NodeState>;
	formulas: Map<number, FormulaState>;
}

//------------------------------------------------------------------------------

const nodeAreaTargetSpec: DropTargetSpec<WrappedNodeAreaProps> = {
	drop:  ( props, monitor, component ) => monitor && monitor.getDifferenceFromInitialOffset() as Position,
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};

//------------------------------------------------------------------------------

const mapStateToProps = ( state: AppState ) => ({
	formulas: state.formulas,
	nodes: state.nodes,
});

//------------------------------------------------------------------------------

const NodeArea = ( props: WrappedNodeAreaProps ) => {
	const { nodes, formulas, fieldId, connectDropTarget } = props;
	const formula = ( formulas.get( fieldId ));
	const formulaNodes = (( formula && formula.nodes ) || [] )
		.map(( id ) => nodes.get( id ) as NodeState );

	return connectDropTarget(
		<div id="node-area">
			<svg id="wire-layer" viewBox="0 0 10000 10000" preserveAspectRatio="none">
			{ formulaNodes.map( node =>
				node.inputNodes
					.map(( inputId, index ) => ({
						node: nodes.get( inputId ) as NodeState,
						index,
					}))
					.filter( pinSpec => pinSpec.node )
					.map( pinSpec => <Wire
						start={{
							x: pinSpec.node.position.x + 160,
							y: pinSpec.node.position.y +  60,
						}}
						end={{
							x: node.position.x,
							y: node.position.y + 100 + ( pinSpec.index * 40 ),
						}}
					/> ),
			)}
			</svg>

			{ formulaNodes.map( node => <FunctionNode
				key={ node.id }
				node={ node } />,
			)}
		</div>,
	);
};

//------------------------------------------------------------------------------

const DroppableNodeArea = DropTarget(Types.FORMULA_NODE, nodeAreaTargetSpec, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))( NodeArea );

export default reduxConnect<{}, {}, NodeAreaProps>( mapStateToProps )( DroppableNodeArea );
