import * as React from 'react';

import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from 'react-dnd';
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';

import DndTypes from './dndTypes';

import { NodeState } from 'state';

import './NodePin.less';

//==============================================================================

interface InputPinProps {
	node: NodeState;
	index: number;
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

const inputPinTargetCollector: DropTargetCollector = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
): Partial<ConnectedInputPinProps> => ({
	connectDropTarget: connect.dropTarget(),
});

//------------------------------------------------------------------------------

export const InputPin = DropTarget(
	DndTypes.OUTPUT_PIN,
	inputPinTargetSpec,
	inputPinTargetCollector,
)( BareInputPin ) as React.ComponentClass<InputPinProps>;


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

const outputPinSourceCollector: DragSourceCollector = (
	connect: DragSourceConnector,
	monitor: DragSourceMonitor,
): Partial<ConnectedOutputPinProps> => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

//------------------------------------------------------------------------------

export const OutputPin = DragSource(
	DndTypes.OUTPUT_PIN,
	outputPinSourceSpec,
	outputPinSourceCollector,
)( BareOutputPin ) as React.ComponentClass<OutputPinProps>;
