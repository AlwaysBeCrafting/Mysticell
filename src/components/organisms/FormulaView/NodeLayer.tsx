import classNames from "classnames";
import React from "react";

import {Dict} from "common/types";

import {NodeView} from "components/molecules";

import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {PRIMITIVES} from "data/Primitive/constants";
import {connectedInputs} from "data/utils";

import "./NodeLayer.scss";


interface Props {
	formula: Formula;
	formulas: Dict<Formula>;
	nodes: Dict<Node>;
	className?: string;
}

const NodeLayer = (props: Props) => {
	const {formula, className} = props;
	const formulaNodes = Object.keys(formula.layout);

	return (
		<div className={classNames("nodeLayer", className)}>
			{formulaNodes.map(renderNode(props))}
		</div>
	);
};

const renderNode = (props: Props) => (nodeId: string) => {
	const {formula, formulas, nodes} = props;
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
		/>
	);
};


export {NodeLayer};
