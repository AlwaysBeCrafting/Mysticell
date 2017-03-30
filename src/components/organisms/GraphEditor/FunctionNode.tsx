import * as React from "react";

import { ConnectDragSource, DragSource } from "react-dnd";
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from "react-dnd";

import { connect as reduxConnect } from "react-redux";

import { Node } from "common/types/document";
import { Position } from "common/types/layout";

import { Action, AppState } from "data";
import { updateNode } from "data/document/graph";
import { selectNodes } from "data/selection";

import dnd from "common/types/dnd";

import { InputPin, OutputPin } from "./NodePin";

import "./FunctionNode.less";


interface FunctionNodeAttributes {
	node: Node;
}

interface FunctionNodeStateProps {
	nodes: Map<number, Node>;
	isSelected: boolean;
}

interface FunctionNodeDispatchProps {
	dispatch: ( action: Action ) => void;
}

interface FunctionNodeDragSource {
	isDragging: boolean;
	connectDragSource: ConnectDragSource;
}

type FunctionNodeProps =
	FunctionNodeAttributes &
	FunctionNodeDispatchProps &
	FunctionNodeStateProps &
	FunctionNodeDragSource;


const FunctionNode = ( props: FunctionNodeProps ) => {
	const { node, nodes } = props;

	const className = ["function-node"];
	if ( props.isDragging ) { className.push( "dragging" ); }
	if ( props.isSelected ) { className.push( "selected" ); }


	return props.connectDragSource(
		<div
			className={ className.join( " " ) }>

			{ <div className="output">
				<OutputPin node={ node } />
				<div className="value">
				</div>
			</div> }

			)) }
		</div>,
	);
};


const nodeSourceSpec: DragSourceSpec<FunctionNodeDragSource> = {
	beginDrag: ( props: FunctionNodeProps ): Node => props.node,
	endDrag:   ( props: FunctionNodeProps, monitor: DragSourceMonitor, component ) => {
		if ( monitor.didDrop() ) {
			const { x: dx, y: dy } = monitor.getDropResult() as Position;

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
	dnd.FORMULA_NODE,
	nodeSourceSpec,
	nodeSourceCollector,
)( FunctionNode );



const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatchProps => ({
	dispatch,
});

export default reduxConnect<{}, {}, FunctionNodeAttributes>(
	mapDispatchToProps,
)( DraggableFunctionNode );
