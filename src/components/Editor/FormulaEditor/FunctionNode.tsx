import * as React from 'react';
import { DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';

import moveNode from 'state/moveNode';

import { NodeMap } from 'data/doc';
import Fxn from 'data/fxn';
import { Position } from 'data/shared';

import Types from './itemTypes';

import './FunctionNode.less';

export interface FunctionNodeProps extends React.Props<FunctionNode> {
	id: number;
	nodes?: NodeMap;
	onMove?: (id: number, position: Position) => void;
	isDragging?: boolean;
	connectDragSource?: any;
}

//==============================================================================

const cardSource: DragSourceSpec<FunctionNodeProps> = {
	beginDrag: (props) => props.nodes ? props.nodes[props.id] : {},
	endDrag:   (props, monitor, component ) => {
		if (!monitor) {
			return;
		}

		if ( monitor.didDrop() ) {
			if (!props.nodes || !props.onMove) {
				return;
			}

			const { x: dx, y: dy } = monitor.getDropResult() as Position;
			const { x, y } = props.nodes[props.id].position || { x: 0, y: 0 };

			const [ tx, ty ] = [
				Math.round(( x + dx ) / 40 ) * 40,
				Math.round(( y + dy ) / 40 ) * 40,
			];

			props.onMove( props.id, { x: tx, y: ty });
		}
	},
};

//------------------------------------------------------------------------------

@DragSource(Types.FORMULA_NODE, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class FunctionNode extends React.PureComponent<FunctionNodeProps, {}> {
	public render() {
		const { connectDragSource, isDragging, id, nodes } = this.props;
		if (!nodes) {
			return;
		}

		const { label, fxn, position } = nodes[id];
		const { inputs, output } = Fxn[fxn];

		const className = [ 'function-node' ];
		if ( isDragging ) {
			className.push( 'dragging' );
		}

		const { x: left, y: top } = position || { x: 0, y: 0 };

		return connectDragSource(
			<div className={ className.join( ' ' ) } style={{ left, top }}>
				<header>{ label }</header>

				{ output && <div className="output" key={ output }>
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

export default reduxConnect<{}, {}, FunctionNodeProps>(
	state => ({
		nodes: state.doc.nodes,
	}),
	dispatch => ({
		onMove: ( id: number, position: Position ) => dispatch( moveNode( id, position )),
	}),
)( FunctionNode );
