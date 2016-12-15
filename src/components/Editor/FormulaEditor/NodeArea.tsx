import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { connect as ReduxConnect } from 'react-redux';

import { Formula, Node } from 'data/doc';
import { Position } from 'data/shared';
import { State } from 'state/reducers';

import FunctionNode from './FunctionNode';
import Types from './itemTypes';
import Wire from './Wire';

import './NodeArea.less';

//==============================================================================

export interface NodeAreaProps extends React.Props<NodeArea> {
	formula?: Formula;
	connectDropTarget?: ConnectDropTarget;
}

interface WrappedNodeAreaProps extends NodeAreaProps {
	nodes: Map<number, Node>;
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

const mapStateToProps = ( state: State ) => ({
	nodes: state.doc.nodes,
});

@DropTarget(Types.FORMULA_NODE, dropTarget, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))
class NodeArea extends React.PureComponent<WrappedNodeAreaProps, {}> {
	public render(): JSX.Element | null {
		const { nodes, formula, connectDropTarget } = this.props;
		const nodeIds = ( formula && formula.nodes ) || new Array<number>();

		if (!connectDropTarget) {
			return null;
		}

		const formulaNodes = nodeIds.map(( id ) => nodes.get( id ) as Node );

		return connectDropTarget(
			<div id="node-area">
				{ formulaNodes.map( node => <FunctionNode
					key={ node.id }
					node={ node } />,
				)}

				{ formulaNodes.map( node =>
					node.inputNodes
						.map( inputId => nodes.get( inputId ) as Node )
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

export default ReduxConnect<{}, {}, NodeAreaProps>( mapStateToProps )( NodeArea );
