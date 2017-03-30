import * as React from "react";
import { connect as reduxConnect, Dispatch } from "react-redux";

import { Position } from "common/types/layout";

import { AppState } from "data";

import FunctionNode from "./FunctionNode";
import Wire from "./Wire";

import "./NodeArea.less";


interface NodeAreaAttributes {
	fieldId: number;
}

interface NodeAreaState {
	nodes: Map<number, Node>;
}

type NodeAreaProps = NodeAreaAttributes & NodeAreaState;


const mapStateToProps = ( state: AppState ) => ({
});


const NodeArea = ( props: NodeAreaProps ) => {
	const { nodes, fieldId } = props;
	const fieldNodes = Array.from( nodes )
		.map(([ id, node ]) => node );

	return (
		<div id="node-area">
			<svg id="wire-layer" preserveAspectRatio="none">
			</svg>
		</div>
	);
};


export default reduxConnect<{}, {}, NodeAreaAttributes>( mapStateToProps )( NodeArea );
