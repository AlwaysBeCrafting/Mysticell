import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { DragSource as dragSource } from 'react-dnd';

import moveNode from 'state/moveNode';

import Fxn from 'data/fxn';

import Types from './itemTypes';

import './FunctionNode.less';

//==============================================================================

const cardSource = {
	beginDrag: ({ id, nodes }) => nodes[id],
	endDrag:   ({ id, nodes, onMove }, monitor, component ) => {
		if ( monitor.didDrop() ) {
			const { x: dx, y: dy } = monitor.getDropResult();
			const { x, y } = nodes[id].position || { x: 0, y: 0 };
			
			const [ tx, ty ] = [
				Math.round(( x + dx ) / 40 ) * 40,
				Math.round(( y + dy ) / 40 ) * 40,
			];
			
			onMove( id, { x: tx, y: ty });
		}
	},
};

//------------------------------------------------------------------------------

const collect = ( connectDnd, monitor ) => ( {
	connectDragSource: connectDnd.dragSource(),
	isDragging:        monitor.isDragging(),
} );

//------------------------------------------------------------------------------

class FunctionNode extends React.PureComponent {
	render() {
		const {
			connectDragSource,
			isDragging,
			id,
			nodes,
		} = this.props;
		
		const { label, fxn, position } = nodes[id];
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

const DraggableFunctionNode = dragSource(
	Types.FORMULA_NODE,
	cardSource,
	collect,
)( FunctionNode );

//------------------------------------------------------------------------------

export default reduxConnect(
	state => ({
		nodes: state.doc.nodes,
	}),
	dispatch => ({
		onMove: ( id, position ) => dispatch( moveNode( id, position )),
	}),
)( DraggableFunctionNode );
