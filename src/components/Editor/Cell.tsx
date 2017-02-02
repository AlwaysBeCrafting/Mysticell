import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { CellState, FieldState, NodeState } from "redux/state";

import "./Cell.less";

interface CellAttributeProps {
	cell: CellState;
}

interface CellStateProps {
	fields: Map<number, FieldState>;
	nodes: Map<number, NodeState>;
}

type CellProps = CellAttributeProps & CellStateProps;

const Cell = ( props: CellProps ) => {
	const style = {
		left: props.cell.start.x,
		top: props.cell.start.y,
		right: `calc( 100% - ${ props.cell.end.x }px )`,
		bottom: `calc( 100% - ${ props.cell.end.y }px )`,
	};

	const field = props.fields.get( props.cell.field );
	const node = field && props.nodes.get( field.resultNode );

	return (
		<div className="cell" style={ style }>{ node && node.outputValue }</div>
	);
};

export default reduxConnect<{}, {}, CellAttributeProps>(
	({ fields, nodes }) => ({ fields, nodes }),
)( Cell );
