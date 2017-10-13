import React from "react";

import { Card, Pin } from "components/atoms";

import { PARAMS } from "data/common";
import { InnerNode } from "data/Graph";
import { NodePrototype } from "data/NodePrototype";

import "./NodeView.scss";


interface Props {
	node: InnerNode;
	prototype: NodePrototype;
	position: [number, number];
	isInputConnected: (index: number) => boolean;
	onUserValueChange: (nodeId: string, index: number, value: string) => void;
}

class NodeView extends React.PureComponent<Props> {
	public render() {
		const { isInputConnected, node, position, prototype } = this.props;
		const name = node.label || prototype.name;
		const pinRowCount = prototype.inputNames.length + prototype.outputNames.length;
		return (
			<Card className="nodeView" style={makeStyle(position, pinRowCount)}>
				<header className="nodeView-headerRow nodeView-row">
					<span className="nodeView-headerRow-name">{name}</span>
				</header>
				{prototype.outputNames.map((outputName, i) => (
					<Pin
						source
						key={outputName}
						name={outputName}
						takesInput={false}
						param={PARAMS.string("")}
						index={i}
					/>
				))}
				{prototype.inputNames.map((inputName, index) => (
					<Pin
						target
						key={inputName}
						name={inputName}
						takesInput={isInputConnected(index)}
						userValue={node.constants[index]}
						param={PARAMS.empty()}
						index={index}
						onChange={this.onUserValueChange}
					/>
				))}
			</Card>
		);
	}

	private onUserValueChange = (index: number, value: string) => {
		this.props.onUserValueChange(this.props.node.id, index, value);
	}
}

const makeStyle = (position: [number, number], pinRowCount: number) => ({
	gridRow: `${position[1] + 1} / span ${pinRowCount + 1}`,
	gridColumn: `${position[0] + 1} / span 4`,
});


export { NodeView };
