import * as React from 'react';

import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from 'react-dnd';
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';

import { connect as reduxConnect } from 'react-redux';

import DndTypes from './dndTypes';

import AppState, { NodeState } from 'state';
import Action from 'state/actions';
import connectNodes from 'state/actions/connectNodes';
import disconnectNodes from 'state/actions/disconnectNodes';

import './NodePin.less';

//==============================================================================

interface InputPinProps {
	node: NodeState;
	index: number;
}

interface InputPinDispatchers {
	dispatch: ( action: Action ) => void;
}

interface ConnectedInputPinProps extends InputPinProps, InputPinDispatchers {
	connectDropTarget: ConnectDropTarget;
}

//------------------------------------------------------------------------------

const onInputPinClick = ( ev: React.MouseEvent<HTMLElement>, props: ConnectedInputPinProps ) => {
	if ( !ev.shiftKey ) { return; }
	props.dispatch( disconnectNodes( props.node, props.index ));
	ev.preventDefault();
};

const BareInputPin = ( props: ConnectedInputPinProps ) => props.connectDropTarget(
	<span className="pin" onClick={ ev => onInputPinClick( ev, props ) } />,
);

//------------------------------------------------------------------------------

const inputPinTargetSpec: DropTargetSpec<ConnectedInputPinProps> = {
	drop: ( props, monitor, component ) => ({ node: props.node, index: props.index}),
};

const inputPinTargetCollector: DropTargetCollector = ( connect, monitor ): Partial<ConnectedInputPinProps> => ({
	connectDropTarget: connect.dropTarget(),
});

//------------------------------------------------------------------------------

const DroppableInputPin = DropTarget(
	DndTypes.OUTPUT_PIN,
	inputPinTargetSpec,
	inputPinTargetCollector,
)( BareInputPin ) as React.ComponentClass<InputPinProps>;

//------------------------------------------------------------------------------

const mapDispatchToInputProps = ( dispatch: ( action: Action ) => void ): InputPinDispatchers => ({
	dispatch,
});

export const InputPin = reduxConnect<{}, {}, InputPinProps>(
	() => ({}),
	mapDispatchToInputProps,
)( DroppableInputPin );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

interface OutputPinProps {
	node: NodeState;
}

interface OutputPinDispatchers {
	dispatch: ( action: Action ) => void;
}

interface ConnectedOutputPinProps extends OutputPinProps, OutputPinDispatchers {
	connectDragSource: ConnectDragSource;
	isDragging: boolean;
}

//------------------------------------------------------------------------------

const BareOutputPin = ( props: ConnectedOutputPinProps ) => props.connectDragSource(
	<span className="pin" />,
);

//------------------------------------------------------------------------------

const outputPinSourceSpec: DragSourceSpec<ConnectedOutputPinProps> = {
	beginDrag: ( props: ConnectedOutputPinProps ) => {
		return { id: 0 };
	},
	endDrag: ( props, monitor: DragSourceMonitor ) => {
		if ( !monitor.didDrop() ) { return; }
		const input = monitor.getDropResult() as { node: NodeState, index: number };
		props.dispatch( connectNodes( props.node, input.node, input.index ));
	},
};

const outputPinSourceCollector: DragSourceCollector = ( connect, monitor ): Partial<ConnectedOutputPinProps> => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

//------------------------------------------------------------------------------

const DraggableOutputPin = DragSource(
	DndTypes.OUTPUT_PIN,
	outputPinSourceSpec,
	outputPinSourceCollector,
)( BareOutputPin ) as React.ComponentClass<OutputPinProps>;


//------------------------------------------------------------------------------

const mapDispatchToOutputProps = ( dispatch: ( action: Action ) => void ): OutputPinDispatchers => ({
	dispatch,
});

export const OutputPin = reduxConnect<{}, {}, OutputPinProps>(
	_ => ({}),
	mapDispatchToOutputProps,
)( DraggableOutputPin );
