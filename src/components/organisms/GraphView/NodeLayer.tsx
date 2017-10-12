import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { Dict } from "common/types";

import { NodeView } from "components/molecules";

import { PRIMITIVES } from "data/common";
import { isBoundaryNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

import "./NodeLayer.scss";


const yes = (_: any) => true; // DELETEME

interface DispatchProps {
	changeUserValue: (nodeId: string, index: number, value: string) => void;
}

interface OwnProps {
	prototype: GraphNodePrototype;
	nodePrototypes: Dict<NodePrototype>;
	className?: string;
}

type Props =
	& DispatchProps
	& OwnProps;

class PartialNodeLayer extends React.PureComponent<Props> {
	public render() {
		const { prototype, className } = this.props;
		const formulaNodes = Object.keys(prototype.layout);

		return (
			<div className={classNames("nodeLayer", className)}>
				{formulaNodes.map(this.renderNode)}
			</div>
		);
	}

	public renderNode = (nodeId: string) => {
		const { prototype, nodePrototypes } = this.props;
		const { graph } = prototype;
		const node = graph[nodeId];

		if (isBoundaryNode(node)) {
			throw new Error(`Tried to render a boundary node in graph of ${prototype.id}`);
		}

		const position = prototype.layout[nodeId] || [0, 0];
		const childPrototype = nodePrototypes[node.prototype] || PRIMITIVES[node.prototype];

		return (
			<NodeView
				key={node.id}
				node={node}
				position={position}
				prototype={childPrototype}
				isInputConnected={yes}
				onUserValueChange={this.props.changeUserValue}
			/>
		);
	}
}

const NodeLayer = connect<{}, DispatchProps, OwnProps>(
	() => ({}),
	dispatch => ({
		changeUserValue: (nodeId: string, index: number, value: string) => {
			// tslint:disable-next-line:no-console
			console.log(dispatch, nodeId, index, value);
		},
	}),
)(PartialNodeLayer);


export { NodeLayer };
