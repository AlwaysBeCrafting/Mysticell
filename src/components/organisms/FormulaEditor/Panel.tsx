import React from "react";

import { params } from "data/common";

import { PinRow } from "components/atoms/PinRow";


interface Props {
	pinNames: string[];
	connectedInputs: number[];
	type: "input" | "output";
}


const Panel = (props: Props) => {
	const { pinNames, connectedInputs, type } = props;

	return (
		<div className={ `formulaEditor-graph-panel formulaEditor-graph-${ type }Panel` }>
			<div className={ `formulaEditor-graph-panel-heading formulaEditor-graph-${ type }Panel-heading` }>
				{ type }
			</div>
			{ pinNames.map((name, index) => (
				type === "input"
					? (
						<PinRow
							type="src"
							name={ name }
							computedValue={ params.string("") }
							key={ name }
						/>
					)
					: (
						<PinRow
							name={ name }
							type="dst"
							isConnected={ connectedInputs.indexOf(index) > -1 }
							param={ params.empty() }
							userValue={ "" }
							key={ name }
						/>
					)
			))}
		</div>
	);
};


export { Panel };
