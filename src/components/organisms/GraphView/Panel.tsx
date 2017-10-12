import React from "react";

import { PARAMS } from "data/common";

import { PinRow } from "components/atoms/PinRow";


interface CommonProps {
	pinNames: string[];
	isPinConnected: (index: number) => boolean;
}
interface InputProps extends CommonProps {
	input: true;
	output?: undefined;
}
interface OutputProps extends CommonProps {
	input?: undefined;
	output: true;
}
type Props =
	| InputProps
	| OutputProps;

const Panel = (props: Props) => {
	const { pinNames, isPinConnected, input } = props;

	const type = input ? "input" : "output";
	return (
		<div className={`graphView-graph-panel graphView-graph-${type}Panel`}>
			<div className={`graphView-graph-panel-heading graphView-graph-${type}Panel-heading`}>
				{type}
			</div>
			{pinNames.map((name, index) => (
				type === "input"
					? (
						<PinRow
							source
							name={name}
							param={PARAMS.string("")}
							index={index}
							key={name}
						/>
					)
					: (
						<PinRow
							target
							name={name}
							takesInput={isPinConnected(index)}
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
