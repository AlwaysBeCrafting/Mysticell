import * as React from 'react';

import { ConnectDragSource, DragSource } from 'react-dnd';
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';

import { connect as reduxConnect } from 'react-redux';

import AppState, { NodeState } from 'state';
import Action from 'state/actions';
import moveNode from 'state/actions/moveNode';

import Fxn from 'data/fxn';
import { Position } from 'data/shared';

import Types from './dndTypes';

import { InputPin, OutputPin } from './NodePin';

import './FunctionNode.less';

//==============================================================================

export interface FunctionNodeProps {
	node: NodeState;
}

export interface FunctionNodeDispatchers {
	onMove: ( id: number, position: Position ) => void;
}

interface WrappedFunctionNodeProps extends FunctionNodeProps, FunctionNodeDispatchers {
	nodes: Map<number, NodeState>;
	isDragging: boolean;
	connectDragSource: ConnectDragSource;
}

//------------------------------------------------------------------------------

const FunctionNode = ({ connectDragSource, isDragging, node }: WrappedFunctionNodeProps ) => {
	const { label, fxn, position } = node;
	const { inputs, output } = Fxn[fxn];

	const className = [ 'function-node' ];
	if ( isDragging ) { className.push( 'dragging' ); }

	const { x: left, y: top } = position || { x: 0, y: 0 };

	return connectDragSource(
		<div className={ className.join( ' ' ) } style={{ left, top }}>
			<header>{ label }</header>

			{ output && <div className="output" key={ output }>
				<OutputPin
					node={ node } />
				{ output }
			</div> }

			{ ( inputs || [] ).map(( input, index ) => (
				<div className="input" key={ input }>
					<InputPin
						node={ node }
						index={ index } />
					{ input }
				</div>
			)) }
		</div>,
	);
};

//------------------------------------------------------------------------------

const nodeSourceSpec: DragSourceSpec<WrappedFunctionNodeProps> = {
	beginDrag: ( props: WrappedFunctionNodeProps ): NodeState => props.node,
	endDrag:   ( props: WrappedFunctionNodeProps, monitor: DragSourceMonitor, component ) => {
		if ( monitor.didDrop() ) {
			const { x: dx, y: dy } = monitor.getDropResult() as Position;
			const { x, y } = props.node.position;

			const [ tx, ty ] = [
				Math.round(( x + dx ) / 40 ) * 40,
				Math.round(( y + dy ) / 40 ) * 40,
			];

			props.onMove( props.node.id, { x: tx, y: ty });
		}
	},
};

const nodeSourceCollector: DragSourceCollector = (
	connect: DragSourceConnector,
	monitor: DragSourceMonitor,
) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

const DraggableFunctionNode = DragSource(
	Types.FORMULA_NODE,
	nodeSourceSpec,
	nodeSourceCollector,
)( FunctionNode );

//------------------------------------------------------------------------------

const mapStateToProps = ( state: AppState ): Partial<WrappedFunctionNodeProps> => ({
	nodes: state.nodes,
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatchers => ({
	onMove: ( id, position ) => dispatch( moveNode( id, position )),
});

export default reduxConnect<{}, {}, FunctionNodeProps>( mapStateToProps, mapDispatchToProps )( DraggableFunctionNode );
