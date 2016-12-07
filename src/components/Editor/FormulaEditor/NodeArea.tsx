import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';

import {Formula} from 'data/doc';
import {Position} from 'data/shared';

import FunctionNode from './FunctionNode';
import Types from './itemTypes';
import Wire from './Wire';

import './NodeArea.less';

export interface NodeAreaProps extends React.Props<NodeArea> {
	formula?: Formula;
	connectDropTarget?: ConnectDropTarget;
}

//==============================================================================

const dropTarget: DropTargetSpec<NodeAreaProps> = {
	drop:  ( props, monitor, component ) => {
		if (!monitor) {
			return undefined;
		}
		return monitor.getDifferenceFromInitialOffset() as Position;
	},
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};

//------------------------------------------------------------------------------

@DropTarget(Types.FORMULA_NODE, dropTarget, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))
class NodeArea extends React.PureComponent<NodeAreaProps, {}> {
	public render(): JSX.Element | null {
		const { formula, connectDropTarget } = this.props;
		const { nodes } = formula || { nodes: new Array<number>() };

		if (!connectDropTarget) {
			return null;
		}

		return connectDropTarget(
			<div id="node-area">
				{ nodes.map( id => <FunctionNode
					key={ id }
					id={ id } />,
				)}
				<Wire />
			</div>,
		);
	}
}

//------------------------------------------------------------------------------

export default NodeArea;
