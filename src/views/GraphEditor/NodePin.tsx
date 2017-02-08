import * as React from "react";

import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from "react-dnd";
import { DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";

import { connect as reduxConnect } from "react-redux";

import { Node } from "common/types";
import dnd from "common/types/dnd";

import { Action } from "data";
import { connectNode, disconnectNode, updateNode } from "data/document/nodes/collection";

import "./NodePin.less";


interface InputPinAttributeProps {
	node: Node;
	index: number;
}

interface InputPinDispatchProps {
	dispatch: ( action: Action ) => void;
}

interface InputPinDropTargetProps {
	connectDropTarget: ConnectDropTarget;
}

type InputPinProps =
	InputPinAttributeProps &
	InputPinDispatchProps &
	InputPinDropTargetProps;


const onInputPinClick = ( ev: React.MouseEvent<HTMLElement>, props: InputPinProps ) => {
	if ( !ev.shiftKey ) { return; }
	props.dispatch( disconnectNode( props.node.id, props.index ));
	props.dispatch( updateNode( props.node.id, props.index ));
	ev.preventDefault();
};

const BareInputPin = ( props: InputPinProps ) => props.connectDropTarget(
	<span className="pin" onClick={ ev => onInputPinClick( ev, props ) } />,
);


const inputPinTargetSpec: DropTargetSpec<InputPinProps> = {
	drop: ( props, monitor, component ) => ({ node: props.node, index: props.index}),
};

const inputPinTargetCollector: DropTargetCollector = ( connect, monitor ): InputPinDropTargetProps => ({
	connectDropTarget: connect.dropTarget(),
});


const DroppableInputPin = DropTarget(
	dnd.OUTPUT_PIN,
	inputPinTargetSpec,
	inputPinTargetCollector,
)( BareInputPin ) as React.ComponentClass<InputPinAttributeProps>;


const mapDispatchToInputProps = ( dispatch: ( action: Action ) => void ): InputPinDispatchProps => ({
	dispatch,
});

export const InputPin = reduxConnect<{}, {}, InputPinAttributeProps>(
	() => ({}),
	mapDispatchToInputProps,
)( DroppableInputPin );


interface OutputPinAttributeProps {
	node: Node;
}

interface OutputPinDispatchProps {
	dispatch: ( action: Action ) => void;
}

interface OutputPinDragSourceProps {
	connectDragSource: ConnectDragSource;
	isDragging: boolean;
}

type OutputPinProps =
	OutputPinAttributeProps &
	OutputPinDispatchProps &
	OutputPinDragSourceProps;


const BareOutputPin = ( props: OutputPinDragSourceProps ) => props.connectDragSource(
	<span className="pin" />,
);


const outputPinSourceSpec: DragSourceSpec<OutputPinDragSourceProps> = {
	beginDrag: ( props: OutputPinProps ) => {
		return { id: 0 };
	},
	endDrag: ( props: OutputPinProps, monitor: DragSourceMonitor ) => {
		if ( !monitor.didDrop() ) { return; }
		const input = monitor.getDropResult() as { node: Node, index: number };
		props.dispatch( connectNode( props.node.id, input.node.id, input.index ));
		props.dispatch( updateNode( input.node.id, input.index ));
	},
};

const outputPinSourceCollector: DragSourceCollector = ( connect, monitor ): OutputPinDragSourceProps => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});


const DraggableOutputPin = DragSource(
	dnd.OUTPUT_PIN,
	outputPinSourceSpec,
	outputPinSourceCollector,
)( BareOutputPin );



const mapDispatchToOutputProps = ( dispatch: ( action: Action ) => void ): OutputPinDispatchProps => ({
	dispatch,
});

export const OutputPin = reduxConnect<{}, {}, OutputPinAttributeProps>(
	_ => ({}),
	mapDispatchToOutputProps,
)( DraggableOutputPin );
