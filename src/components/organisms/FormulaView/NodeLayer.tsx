import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { Dict } from "common/types";

import { NodeView } from "components/molecules";

import { Formula } from "data/Formula";
import { Node, setUserValueAsync } from "data/Node";
import { PRIMITIVES } from "data/Primitive";
import { connectedInputs } from "data/utils";

import "./NodeLayer.scss";


interface DispatchProps {
	changeUserValue: (nodeId: string, index: number, value: string) => void;
}

interface OwnProps {
	formula: Formula;
	formulas: Dict<Formula>;
	nodes: Dict<Node>;
	className?: string;
}

type Props =
	& DispatchProps
	& OwnProps;

class ProtoNodeLayer extends React.PureComponent<Props> {
	public render() {
		const {formula, className} = this.props;
		const formulaNodes = Object.keys(formula.layout);

		return (
			<div className={classNames("nodeLayer", className)}>
				{formulaNodes.map(this.renderNode)}
			</div>
		);
	}

	public renderNode = (nodeId: string) => {
		const {formula, formulas, nodes} = this.props;
		const {graph} = formula;
		const node = nodes[nodeId];

		if (!node) {
			throw new Error(`No node ${nodeId} exists`);
		}

		const position = formula.layout[nodeId] || [0, 0];
		const nodeFunction = formulas[node.function] || PRIMITIVES[node.function];

		if (!nodeFunction) {
			throw new Error(`No function ${nodeFunction} exists`);
		}

		return (
			<NodeView
				node={node}
				position={position}
				nodeFunction={nodeFunction}
				connectedInputs={connectedInputs(graph, nodeId)}
				key={nodeId}
				onUserValueChange={this.props.changeUserValue}
			/>
		);
	}
}

const NodeLayer = connect<{}, DispatchProps, OwnProps>(
	() => ({}),
	dispatch => ({
		changeUserValue: (nodeId: string, index: number, value: string) => {
			dispatch(setUserValueAsync(nodeId, index, value));
		},
	}),
)(ProtoNodeLayer);


export {NodeLayer};
