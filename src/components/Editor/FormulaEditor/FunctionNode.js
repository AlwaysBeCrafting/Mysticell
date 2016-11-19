import React from 'react';
import { DragSource as dragSource } from 'react-dnd';

import Fxn from 'data/fxn';

import Types from './itemTypes';

import './FunctionNode.less';

//==============================================================================

const cardSource = {
	beginDrag: props => ({
		_id: 0,
	}),
	endDrag: ( props, monitor, component ) => 'endDrag',
};

//------------------------------------------------------------------------------

const collect = ( connect, monitor ) => ( {
	connectDragSource: connect.dragSource(),
	isDragging:        monitor.isDragging(),
} );

//------------------------------------------------------------------------------

class FunctionNode extends React.PureComponent {
	render() {
		const {
			connectDragSource,
			isDragging,
			node: { label, fxn },
		} = this.props;
		
		const { inputs, output } = Fxn[fxn];
		
		return connectDragSource(
			<div className="function-node">
				<header>{ isDragging ? 'dragging' : label }</header>
				
				{ output && <div className="output" key={ output.name }>
					<span className="pin" />
					{ output }
				</div> }
				
				{ ( inputs || [] ).map( input => (
					
					<div className="input" key={ input }>
						<span className="pin" />
						{ input }
					</div>
				)) }
			</div>,
		);
	}
}

//------------------------------------------------------------------------------

export default dragSource(
	Types.FORMULA_NODE,
	cardSource,
	collect,
)( FunctionNode );
