import React from "react";

import {Card, PinRow} from "components/atoms";

import {params} from "data/common";
import {Node, NodeFunction} from "data/Node/model";

import "./NodeView.scss";


interface Props {
	position: [number, number];
	node: Node;
	connectedInputs: number[];
	nodeFunction: NodeFunction;
}

const NodeView = (props: Props) => {
	const {position, node, connectedInputs, nodeFunction} = props;
	const name = node.label || nodeFunction.name;
	const pinRowCount = nodeFunction.inputNames.length + nodeFunction.outputNames.length;
	return (
		<Card className="nodeView" style={makeStyle(position, pinRowCount)}>
			<header className="nodeView-headerRow nodeView-row">
				<span className="nodeView-headerRow-name">{name}</span>
			</header>
			{nodeFunction.outputNames.map(outputName => (
				<PinRow
					type="src"
					name={outputName}
					computedValue={params.string("")}
					key={outputName}
				/>
			))}
			{nodeFunction.inputNames.map((inputName, index) => {
				const isConnected = connectedInputs.indexOf(index) > -1;
				return (
					<PinRow
						type="dst"
						name={inputName}
						isConnected={isConnected}
						userValue={node.userValues[index]}
						param={params.empty()}
						key={inputName}
					/>
				);
			})}
		</Card>
	);
};

const makeStyle = (position: [number, number], pinRowCount: number) => ({
	gridRow: `${position[1] + 1} / span ${pinRowCount + 1}`,
	gridColumn: `${position[0] + 1} / span 4`,
});


export {NodeView};
