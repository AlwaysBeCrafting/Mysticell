import * as React from "react";

import { ConnectDragSource, DragSource } from "react-dnd";
import { DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from "react-dnd";

import { connect as reduxConnect } from "react-redux";

import { Node } from "common/types";
import { Position } from "common/types/layout";

import { Action, AppState } from "data";
import { moveNode, updateNode } from "data/document/nodes/collection";
import { selectNodes } from "data/document/nodes/selection";

import dnd from "common/types/dnd";

import { InputPin, OutputPin } from "./NodePin";

import "./FunctionNode.less";

//==============================================================================

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

//------------------------------------------------------------------------------

const FunctionNode = ( props: FunctionNodeProps ) => {
	const { node, nodes } = props;
	const { inputNames, outputName } = node.fxn;

	const className = ["function-node"];
	if ( props.isDragging ) { className.push( "dragging" ); }
	if ( props.isSelected ) { className.push( "selected" ); }

	const { x: left, y: top } = node.position || { x: 0, y: 0 };

	return props.connectDragSource(
		<div
			className={ className.join( " " ) }
			style={{ left, top }}
			onClick={ () => props.dispatch( selectNodes( [ node.id ])) }>
			<header>{ node.label }</header>

			{ outputName && <div className="output" key={ outputName }>
				<OutputPin node={ node } />
				<label>{ outputName }</label>
				<div className="value">
					{ node.outputValue }
				</div>
			</div> }

			{ ( inputNames || [] ).map(( inputName, index ) => (
				<div className="input" key={ inputName }>
					<InputPin
						node={ node }
						index={ index } />
					<label>{ inputName }</label>
					{
						node.inputNodes[index] && <div
							className="value"
							contentEditable={ false }>{ node.inputValues[index] }</div>
					}
					{
						!node.inputNodes[index] && <div
							className="value"
							onInput={ ev => props.dispatch( updateNode( node.id, index, ev.currentTarget.textContent || "" )) }
							contentEditable={ true } />
					}
				</div>
			)) }
		</div>,
	);
};

//------------------------------------------------------------------------------

const nodeSourceSpec: DragSourceSpec<FunctionNodeDragSource> = {
	beginDrag: ( props: FunctionNodeProps ): Node => props.node,
	endDrag:   ( props: FunctionNodeProps, monitor: DragSourceMonitor, component ) => {
		if ( monitor.didDrop() ) {
			const { x: dx, y: dy } = monitor.getDropResult() as Position;
			const { x, y } = props.node.position;

			const [ tx, ty ] = [
				Math.round(( x + dx ) / 40 ) * 40,
				Math.round(( y + dy ) / 40 ) * 40,
			];

			props.dispatch( moveNode( props.node.id, { x: tx, y: ty } ));
			props.dispatch( selectNodes( [ props.node.id ] ));
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

//------------------------------------------------------------------------------

const mapStateToProps = ( state: AppState, props: FunctionNodeAttributes ): FunctionNodeStateProps => ({
	nodes: state.document.nodes.collection,
	isSelected: !!state.document.nodes.selection.find( id => id === props.node.id ),
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatchProps => ({
	dispatch,
});

export default reduxConnect<{}, {}, FunctionNodeAttributes>(
	mapStateToProps,
	mapDispatchToProps,
)( DraggableFunctionNode );
