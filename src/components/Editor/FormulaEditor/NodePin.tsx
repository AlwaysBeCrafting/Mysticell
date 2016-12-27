import * as React from 'react';

import { DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';

import DndTypes from './dndTypes';

import './NodePin.less';

//==============================================================================

interface InputPinProps {}

const BareInputPin = ( props: InputPinProps ) => <span className="pin" />;

const inputPinTargetSpec: DropTargetSpec<InputPinProps> = {
	drop: ( props, monitor, component ) => { /* Do nothing on drop; TODO: do something on drop */ },
	hover: ( props, monitor, component ) => { /* Do nothing on hover */ },
};

export const InputPin = DropTarget(
	DndTypes.OUTPUT_PIN,
	inputPinTargetSpec,
	( connect, monitor ) => ({ connectDropTarget: connect.dropTarget() }),
)( BareInputPin ) as React.ComponentClass<OutputPinProps>;


//------------------------------------------------------------------------------

interface OutputPinProps {}

const BareOutputPin = ( props: OutputPinProps ) => <span className="pin" />;

const outputPinSourceSpec: DragSourceSpec<OutputPinProps> = {
	beginDrag: ( props: OutputPinProps ): {} => ({}),
	endDrag:   ( props: OutputPinProps, monitor: DragSourceMonitor, component ) => {},
};

export const OutputPin = DragSource(
	DndTypes.OUTPUT_PIN,
	outputPinSourceSpec,
	( connect, monitor ) => ({ connectDragSource: connect.dragSource() }),
)( BareOutputPin ) as React.ComponentClass<OutputPinProps>;
