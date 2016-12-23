import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';

import { Position } from 'data/shared';
import AppState, { FormulaState, NodeState } from 'state';

import FunctionNode from './FunctionNode';
import Types from './itemTypes';
import Wire from './Wire';

import './NodeArea.less';

//==============================================================================

export interface NodeAreaProps extends React.Props<NodeArea> {
	fieldId: number;
	connectDropTarget?: ConnectDropTarget;
}

interface WrappedNodeAreaProps extends NodeAreaProps {
	nodes: Map<number, NodeState>;
	formulas: Map<number, FormulaState>;
}

//------------------------------------------------------------------------------

const dropTarget: DropTargetSpec<WrappedNodeAreaProps> = {
	drop:  ( props, monitor, component ) => {
		if (!monitor) {
			return undefined;
		}
		return monitor.getDifferenceFromInitialOffset() as Position;
	},
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};

//------------------------------------------------------------------------------

const mapStateToProps = ( state: AppState ) => ({
	nodes: state.nodes,
});

@DropTarget(Types.FORMULA_NODE, dropTarget, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))
class NodeArea extends React.PureComponent<WrappedNodeAreaProps, {}> {
	public render(): JSX.Element | null {
		const { nodes, formulas, fieldId, connectDropTarget } = this.props;
		const formula = ( formulas.get( fieldId ));
		const formulaNodes = (( formula && formula.nodes ) || [] )
			.map(( id ) => nodes.get( id ) as NodeState);

		if (!connectDropTarget) {
			return null;
		}

		return connectDropTarget(
			<div id="node-area">
				{ formulaNodes.map( node => <FunctionNode
					key={ node.id }
					node={ node } />,
				)}

				{ formulaNodes.map( node =>
					node.inputNodes
						.map( inputId => nodes.get( inputId ) as NodeState )
						.filter( inputNode => inputNode )
						.map(( inputNode, index ) => <Wire
							start={{
								x: inputNode.position.x + 160,
								y: inputNode.position.y +  60,
							}}
							end={{
								x: node.position.x,
								y: node.position.y + 100 + ( index * 40 ),
							}}
						/> ),
				)}
			</div>,
		);
	}
}

//------------------------------------------------------------------------------

export default reduxConnect<{}, {}, NodeAreaProps>( mapStateToProps )( NodeArea );
