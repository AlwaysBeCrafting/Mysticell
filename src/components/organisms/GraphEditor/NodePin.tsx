import * as React from "react";

import { connect as reduxConnect } from "react-redux";

import dnd from "common/types/dnd";
import { Node } from "common/types/document";

import { Action } from "data";
import { connectNode, disconnectNode, updateNode } from "data/document/graph";

import "./NodePin.less";


interface InputPinAttributeProps {
	node: Node;
	index: number;
}

interface InputPinDispatchProps {
	dispatch: ( action: Action ) => void;
}

type InputPinProps =
	InputPinAttributeProps &
	InputPinDispatchProps;


const onInputPinClick = ( ev: React.MouseEvent<HTMLElement>, props: InputPinProps ) => {
	if ( !ev.shiftKey ) { return; }
	props.dispatch( disconnectNode( props.node.id, props.index ));
	props.dispatch( updateNode( props.node.id, props.index ));
	ev.preventDefault();
};

const BareInputPin = ( props: InputPinProps ) => (
	<span className="pin" onClick={ ev => onInputPinClick( ev, props ) } />
);


const mapDispatchToInputProps = ( dispatch: ( action: Action ) => void ): InputPinDispatchProps => ({
	dispatch,
});

export const InputPin = reduxConnect<{}, {}, InputPinAttributeProps>(
	() => ({}),
	mapDispatchToInputProps,
)( BareInputPin );


interface OutputPinAttributeProps {
	node: Node;
}

interface OutputPinDispatchProps {
	dispatch: ( action: Action ) => void;
}

interface OutputPinDragSourceProps {
	isDragging: boolean;
}

type OutputPinProps =
	OutputPinAttributeProps &
	OutputPinDispatchProps &
	OutputPinDragSourceProps;


const BareOutputPin = ( props: OutputPinDragSourceProps ) => (
	<span className="pin" />
);


const mapDispatchToOutputProps = ( dispatch: ( action: Action ) => void ): OutputPinDispatchProps => ({
	dispatch,
});

export const OutputPin = reduxConnect<{}, {}, OutputPinAttributeProps>(
	_ => ({}),
	mapDispatchToOutputProps,
)( BareOutputPin );
