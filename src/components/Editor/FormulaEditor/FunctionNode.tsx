import * as React from 'react';

import { ConnectDragSource, DragSource } from 'react-dnd';
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';

import { connect as reduxConnect } from 'react-redux';

import AppState, { NodeState } from 'state';
import Action from 'state/action';
import moveNode from 'state/action/moveNode';
import removeNode from 'state/action/removeNode';
import selectNode from 'state/action/selectNode';

import Fxn from 'data/fxn';
import { Position } from 'data/shared';

import Types from './dndTypes';

import { InputPin, OutputPin } from './NodePin';

import './FunctionNode.less';

//==============================================================================

interface FunctionNodeAttributes {
	node: NodeState;
}

interface FunctionNodeState {
	nodes: Map<number, NodeState>;
	isSelected: boolean;
}

interface FunctionNodeDispatcher {
	dispatch: ( action: Action ) => void;
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

const FunctionNode = ( props: FunctionNodeProps ) => {
	const { node } = props;
	const { inputs, output } = Fxn[node.fxn];

	const className = ['function-node'];
	if ( props.isDragging ) { className.push( 'dragging' ); }
	if ( props.isSelected ) { className.push( 'selected' ); }

	const { x: left, y: top } = node.position || { x: 0, y: 0 };

	return props.connectDragSource(
		<div
			tabIndex={ 0 }
			className={ className.join( ' ' ) }
			style={{ left, top }}
			onClick={ () => props.dispatch( selectNode( node.id )) }
			onKeyPress={ ev => {
				if ( ev.key === 'Delete' ) { props.dispatch( removeNode( node.id )); }}
			}>
			<header>{ node.label }</header>

			{ output && <div className="output" key={ output }>
				<OutputPin node={ node } />
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
			props.dispatch( selectNode( props.node.id ));
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

const mapStateToProps = ( state: AppState, props: FunctionNodeAttributes ): FunctionNodeState => ({
	nodes: state.nodes,
	isSelected: !!state.selectedNodes.find( id => id === props.node.id ),
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatcher => ({
	dispatch,
});

export default reduxConnect<{}, {}, FunctionNodeAttributes>(
	mapStateToProps,
	mapDispatchToProps,
)( DraggableFunctionNode );
