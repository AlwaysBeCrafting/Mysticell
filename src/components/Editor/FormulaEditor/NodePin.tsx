import * as React from 'react';

import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from 'react-dnd';
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';

import { connect as reduxConnect } from 'react-redux';

import DndTypes from './dndTypes';

import AppState, { NodeState } from 'state';
import Action from 'state/actions';

import './NodePin.less';

//==============================================================================

interface InputPinProps {
	node: NodeState;
	index: number;
}

interface InputPinDispatchers {
	dispatch: ( action: Action ) => void;
}

interface ConnectedInputPinProps extends InputPinProps {
	connectDropTarget: ConnectDropTarget;
}

//------------------------------------------------------------------------------

const BareInputPin = ( props: ConnectedInputPinProps ) => props.connectDropTarget(
	<span className="pin" />,
);

//------------------------------------------------------------------------------

const inputPinTargetSpec: DropTargetSpec<InputPinProps> = {
	drop: ( props, monitor, component ) => { /* No action */ },
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
	_ => ({}),
	mapDispatchToInputProps,
)( DroppableInputPin );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

interface OutputPinProps {
	node: NodeState;
}

interface ConnectedOutputPinProps extends OutputPinProps {
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
};

const outputPinSourceCollector: DragSourceCollector = ( connect, monitor ): Partial<ConnectedOutputPinProps> => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

//------------------------------------------------------------------------------

export const OutputPin = DragSource(
	DndTypes.OUTPUT_PIN,
	outputPinSourceSpec,
	outputPinSourceCollector,
)( BareOutputPin ) as React.ComponentClass<OutputPinProps>;
