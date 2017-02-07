import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Cell, Field, Node } from "data";

import "./Cell.less";

interface CellAttributeProps {
	cell: Cell;
}

interface CellStateProps {
	fields: Map<number, Field>;
	nodes: Map<number, Node>;
}

type CellProps = CellAttributeProps & CellStateProps;

const CellComp = ( props: CellProps ) => {
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
	state => ({
		fields: state.document.fields.fields,
		nodes: state.document.nodes.nodes,
	}),
)( CellComp );
