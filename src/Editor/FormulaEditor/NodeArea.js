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
	isOver:            monitor.isOver(),
});

//------------------------------------------------------------------------------

class NodeArea extends React.PureComponent {
	render() {
		// const { nodes, isOver } = this.props;
		const { connectDropTarget } = this.props;
		
		return connectDropTarget(
			<div id="node-area">
				<FunctionNode
					name="Add"
					inputs={ [
						{ name: 'A' },
						{ name: 'B' },
					] }
					outputs={ [
						{ name: 'Sum' },
					] } />
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
