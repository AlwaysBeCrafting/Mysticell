import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from "react-dnd";
import { connect as reduxConnect, Dispatch } from "react-redux";

import { Position } from "data/shared";

import { AppState, FieldState, NodeState } from "redux/state";

import Types from "./dndTypes";
import FunctionNode from "./FunctionNode";
import Wire from "./Wire";

import "./NodeArea.less";

//==============================================================================

interface NodeAreaAttributes {
	fieldId: number;
}

interface NodeAreaDropTarget {
	connectDropTarget: ConnectDropTarget;
}

interface NodeAreaState {
	nodes: Map<number, NodeState>;
	fields: Map<number, FieldState>;
}

type NodeAreaProps = NodeAreaAttributes & NodeAreaDropTarget & NodeAreaState;

//------------------------------------------------------------------------------

const nodeAreaTargetSpec: DropTargetSpec<NodeAreaDropTarget> = {
	drop:  ( props, monitor, component ) => monitor && monitor.getDifferenceFromInitialOffset() as Position,
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};

//------------------------------------------------------------------------------

const mapStateToProps = ( { fields, nodes }: AppState ) => ({
	fields,
	nodes,
});

//------------------------------------------------------------------------------

const NodeArea = ( props: NodeAreaProps ) => {
	const { nodes, fields, fieldId, connectDropTarget } = props;
	const field = ( fields.get( fieldId ));
	const fieldNodes = Array.from( nodes )
		.filter(([ id, node ]) => node.field === fieldId )
		.map(([ id, node ]) => node );

	return connectDropTarget(
		<div id="node-area">
			<svg id="wire-layer" preserveAspectRatio="none">
			{ fieldNodes.map( node =>
				( node.inputNodes.filter( inputId => !!inputId ) as number[] )
					.map(( inputId, index ) => ({
						node: nodes.get( inputId ) as NodeState,
						index,
					}))
					.filter( pinSpec => pinSpec.node )
					.map( pinSpec => <Wire
						start={{
							x: pinSpec.node.position.x + 160,
							y: pinSpec.node.position.y +  60,
						}}
						end={{
							x: node.position.x,
							y: node.position.y + 100 + ( pinSpec.index * 40 ),
						}}
					/> ),
			)}
			</svg>

			{ fieldNodes.map( node => <FunctionNode
				key={ node.id }
				node={ node } />,
			)}
		</div>,
	);
};

//------------------------------------------------------------------------------

const DroppableNodeArea = DropTarget(Types.FORMULA_NODE, nodeAreaTargetSpec, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))( NodeArea );

export default reduxConnect<{}, {}, NodeAreaAttributes>( mapStateToProps )( DroppableNodeArea );
