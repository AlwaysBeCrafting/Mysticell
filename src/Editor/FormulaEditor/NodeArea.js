import React from 'react';
import { DropTarget } from 'react-dnd';

import FunctionNode from './FunctionNode';
import Types from './itemTypes';

import './NodeArea.less';

//==============================================================================

const dropTarget = {
	drop:  ( props, monitor, component ) => {},
	hover: ( props, monitor, component ) => {},
};

//------------------------------------------------------------------------------

const collect = ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
});

//------------------------------------------------------------------------------

class NodeArea extends React.PureComponent {
	render() {
		const { formula: { nodes }, connectDropTarget } = this.props;
		
		return connectDropTarget(
			<div id="node-area">
				{ nodes.map( node => <FunctionNode
					key={ node._id }
					node={ node } />,
				)},
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
