import React from 'react';
import { DropTarget } from 'react-dnd';

import FunctionNode from './FunctionNode';
import Types from './itemTypes';
import Wire from './Wire';

import './NodeArea.less';

//==============================================================================

const dropTarget = {
	drop:  ( props, monitor, component ) => monitor.getDifferenceFromInitialOffset(),
	hover: ( props, monitor, component ) => {},
};

//------------------------------------------------------------------------------

const collect = ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
});

//------------------------------------------------------------------------------

class NodeArea extends React.PureComponent {
	render() {
		const { formula, connectDropTarget } = this.props;
		const { nodes } = formula || { nodes: [] };
		
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

export default DropTarget(
	Types.FORMULA_NODE,
	dropTarget,
	collect,
)( NodeArea );
