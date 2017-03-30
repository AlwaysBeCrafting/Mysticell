import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Cell, Graph, Node } from "common/types/document";

import "./Cell.less";

interface CellAttributeProps {
	cell: Cell;
}

interface CellStateProps {
	graph: Graph;
}

type CellProps = CellAttributeProps & CellStateProps;

const CellComp = ( props: CellProps ) => {
	const style = {
		left: props.cell.start.x,
		top: props.cell.start.y,
		right: `calc( 100% - ${ props.cell.end.x }px )`,
		bottom: `calc( 100% - ${ props.cell.end.y }px )`,
	};

	const node = props.graph.get( props.cell.node );

	return (
		<div className="cell" style={ style }>{ node && node.name }</div>
	);
};

export default reduxConnect<{}, {}, CellAttributeProps>(
	state => ({
		fields: state.document.fields.fields,
		nodes: state.document.nodes.nodes,
	}),
)( CellComp );
