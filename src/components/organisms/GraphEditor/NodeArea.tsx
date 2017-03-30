import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from "react-dnd";
import { connect as reduxConnect, Dispatch } from "react-redux";

import dnd from "common/types/dnd";
import { Position } from "common/types/layout";

import { AppState } from "data";

import FunctionNode from "./FunctionNode";
import Wire from "./Wire";

import "./NodeArea.less";


interface NodeAreaAttributes {
	fieldId: number;
}

interface NodeAreaDropTarget {
	connectDropTarget: ConnectDropTarget;
}

interface NodeAreaState {
	nodes: Map<number, Node>;
}

type NodeAreaProps = NodeAreaAttributes & NodeAreaDropTarget & NodeAreaState;


const nodeAreaTargetSpec: DropTargetSpec<NodeAreaDropTarget> = {
	drop:  ( props, monitor, component ) => monitor && monitor.getDifferenceFromInitialOffset() as Position,
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};


const mapStateToProps = ( state: AppState ) => ({
});


const NodeArea = ( props: NodeAreaProps ) => {
	const { nodes, fieldId, connectDropTarget } = props;
	const fieldNodes = Array.from( nodes )
		.map(([ id, node ]) => node );

	return connectDropTarget(
		<div id="node-area">
			<svg id="wire-layer" preserveAspectRatio="none">
			</svg>
		</div>,
	);
};


const DroppableNodeArea = DropTarget( dnd.FORMULA_NODE, nodeAreaTargetSpec, ( connect, monitor ) => ({
	connectDropTarget: connect.dropTarget(),
}))( NodeArea );

export default reduxConnect<{}, {}, NodeAreaAttributes>( mapStateToProps )( DroppableNodeArea );
