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

interface FunctionNodeAttributes {
	node: NodeState;
}

interface FunctionNodeDispatcher {
	dispatch: ( action: Action ) => void;
}

interface FunctionNodeState {
	nodes: Map<number, NodeState>;
}

interface FunctionNodeDragSource {
	isDragging: boolean;
	connectDragSource: ConnectDragSource;
}

interface FunctionNodeProps extends
	FunctionNodeAttributes,
	FunctionNodeDispatcher,
	FunctionNodeState,
	FunctionNodeDragSource {}

//------------------------------------------------------------------------------

const FunctionNode = ({ connectDragSource, isDragging, node }: FunctionNodeProps ) => {
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

const nodeSourceSpec: DragSourceSpec<FunctionNodeDragSource> = {
	beginDrag: ( props: FunctionNodeProps ): NodeState => props.node,
	endDrag:   ( props: FunctionNodeProps, monitor: DragSourceMonitor, component ) => {
		if ( monitor.didDrop() ) {
			const { x: dx, y: dy } = monitor.getDropResult() as Position;
			const { x, y } = props.node.position;

			const [ tx, ty ] = [
				Math.round(( x + dx ) / 40 ) * 40,
				Math.round(( y + dy ) / 40 ) * 40,
			];

			props.dispatch( moveNode( props.node.id, { x: tx, y: ty }));
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

const mapStateToProps = ( state: AppState ): FunctionNodeState => ({
	nodes: state.nodes,
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatcher => ({
	dispatch,
});

export default reduxConnect<{}, {}, FunctionNodeAttributes>(
	mapStateToProps,
	mapDispatchToProps,
)( DraggableFunctionNode );
