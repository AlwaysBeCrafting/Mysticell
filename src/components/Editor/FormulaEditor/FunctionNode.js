import React from 'react';
import { DragSource as dragSource } from 'react-dnd';

import Fxn from 'data/fxn';

import Types from './itemTypes';

import './FunctionNode.less';

//==============================================================================

const cardSource = {
	beginDrag: ({ node }) => node,
	endDrag:   ({ node }, monitor, component ) => {
		const { x: dx, y: dy } = monitor.getDropResult();
		const { x, y } = node.position || { x: 0, y: 0 };
		node.position = {
			x: x + dx,
			y: y + dy,
		};
	},
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
			node: { label, fxn, position },
		} = this.props;
		
		const { inputs, output } = Fxn[fxn];
		
		const className = [ 'function-node' ];
		if ( isDragging ) className.push( 'dragging' );
		
		const { x: left, y: top } = position || { x: 0, y: 0 };
		
		return connectDragSource(
			<div className={ className.join( ' ' ) } style={{ left, top }}>
				<header>{ label }</header>
				
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
