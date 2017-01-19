import * as React from "react";

import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from "react-dnd";
import { DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";

import { connect as reduxConnect } from "react-redux";

import DndTypes from "./dndTypes";

import { Action } from "redux/actions";
import { connectNode, disconnectNode } from "redux/actions/nodes";
import { AppState, NodeState } from "redux/state";

import "./NodePin.less";

//==============================================================================

interface InputPinAttributes {
	node: NodeState;
	index: number;
}

interface InputPinDispatcher {
	dispatch: ( action: Action ) => void;
}

interface InputPinDropTarget {
	connectDropTarget: ConnectDropTarget;
}

type InputPinProps =
	InputPinAttributes &
	InputPinDispatcher &
	InputPinDropTarget;

//------------------------------------------------------------------------------

const onInputPinClick = ( ev: React.MouseEvent<HTMLElement>, props: InputPinProps ) => {
	if ( !ev.shiftKey ) { return; }
	props.dispatch( disconnectNode( props.node, props.index ));
	ev.preventDefault();
};

const BareInputPin = ( props: InputPinProps ) => props.connectDropTarget(
	<span className="pin" onClick={ ev => onInputPinClick( ev, props ) } />,
);

//------------------------------------------------------------------------------

const inputPinTargetSpec: DropTargetSpec<InputPinProps> = {
	drop: ( props, monitor, component ) => ({ node: props.node, index: props.index}),
};

const inputPinTargetCollector: DropTargetCollector = ( connect, monitor ): Partial<InputPinDropTarget> => ({
	connectDropTarget: connect.dropTarget(),
});

//------------------------------------------------------------------------------

const DroppableInputPin = DropTarget(
	DndTypes.OUTPUT_PIN,
	inputPinTargetSpec,
	inputPinTargetCollector,
)( BareInputPin ) as React.ComponentClass<InputPinAttributes>;

//------------------------------------------------------------------------------

const mapDispatchToInputProps = ( dispatch: ( action: Action ) => void ): InputPinDispatcher => ({
	dispatch,
});

export const InputPin = reduxConnect<{}, {}, InputPinAttributes>(
	() => ({}),
	mapDispatchToInputProps,
)( DroppableInputPin );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

interface OutputPinAttributes {
	node: NodeState;
}

interface OutputPinDispatchers {
	dispatch: ( action: Action ) => void;
}

interface OutputPinDragSource {
	connectDragSource: ConnectDragSource;
	isDragging: boolean;
}

type OutputPinProps =
	OutputPinAttributes &
	OutputPinDispatchers &
	OutputPinDragSource;

//------------------------------------------------------------------------------

const BareOutputPin = ( props: OutputPinDragSource ) => props.connectDragSource(
	<span className="pin" />,
);

//------------------------------------------------------------------------------

const outputPinSourceSpec: DragSourceSpec<OutputPinDragSource> = {
	beginDrag: ( props: OutputPinProps ) => {
		return { id: 0 };
	},
	endDrag: ( props: OutputPinProps, monitor: DragSourceMonitor ) => {
		if ( !monitor.didDrop() ) { return; }
		const input = monitor.getDropResult() as { node: NodeState, index: number };
		props.dispatch( connectNode( props.node, input.node, input.index ));
	},
};

const outputPinSourceCollector: DragSourceCollector = ( connect, monitor ): OutputPinDragSource => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

//------------------------------------------------------------------------------

const DraggableOutputPin = DragSource(
	DndTypes.OUTPUT_PIN,
	outputPinSourceSpec,
	outputPinSourceCollector,
)( BareOutputPin );


//------------------------------------------------------------------------------

const mapDispatchToOutputProps = ( dispatch: ( action: Action ) => void ): OutputPinDispatchers => ({
	dispatch,
});

export const OutputPin = reduxConnect<{}, {}, OutputPinAttributes>(
	_ => ({}),
	mapDispatchToOutputProps,
)( DraggableOutputPin );
