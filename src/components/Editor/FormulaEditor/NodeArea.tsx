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

		return connectDropTarget(
			<div id="node-area">
				{ nodeIds.map( id => <FunctionNode
					key={ id }
					node={ nodes.get( id ) as Node } />,
				)}

				{ nodeIds.map( id => <Wire start={{ x: 0, y: 0 }} end={{ x: 4 * 40, y: 8 * 40 }}/> )}
			</div>,
		);
	}
}

//------------------------------------------------------------------------------

export default ReduxConnect<{}, {}, NodeAreaProps>( mapStateToProps )( NodeArea );
