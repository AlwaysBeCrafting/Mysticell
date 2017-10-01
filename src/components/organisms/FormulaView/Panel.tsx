import React from "react";

import { PARAMS } from "data/common";

import { PinRow } from "components/atoms/PinRow";


interface Props {
	pinNames: string[];
	connectedInputs: number[];
	type: "input" | "output";
}

const Panel = (props: Props) => {
	const {pinNames, connectedInputs, type} = props;

	return (
		<div className={`formulaView-graph-panel formulaView-graph-${type}Panel`}>
			<div className={`formulaView-graph-panel-heading formulaView-graph-${type}Panel-heading`}>
				{type}
			</div>
			{pinNames.map((name, index) => (
				type === "input"
					? (
						<PinRow
							type="src"
							name={name}
							computedValue={PARAMS.string("")}
							key={name}
						/>
					)
					: (
						<PinRow
							name={name}
							type="dst"
							isConnected={connectedInputs.indexOf(index) > -1}
							param={PARAMS.empty()}
							userValue={""}
							index={index}
							key={name}
						/>
					)
			))}
		</div>
	);
};


export { Panel };
