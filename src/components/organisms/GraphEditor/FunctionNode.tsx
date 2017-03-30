import * as React from "react";

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


	return (
		<div
			className={ className.join( " " ) }>

			{ <div className="output">
				<OutputPin node={ node } />
				<div className="value">
				</div>
			</div> }

			)) }
		</div>
	);
};


const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): FunctionNodeDispatchProps => ({
	dispatch,
});

export default reduxConnect<{}, {}, FunctionNodeAttributes>(
	mapDispatchToProps,
)( FunctionNode );
