import classNames from "classnames";
import React from "react";

import {Dict, DiEdge} from "common/types";
import {formulaLayoutWidth} from "common/utils";

import {Wire} from "components/atoms";

import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {PRIMITIVES} from "data/Primitive/constants";


const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

interface Props {
	formula: Formula;
	formulas: Dict<Formula>;
	nodes: Dict<Node>;
	className?: string;
}

const WireLayer = (props: Props) => {
	const {formula, className} = props;
	const render = renderWithProps(props);
	return (
		<svg className={classNames("wireLayer", className)}>
			{formula.graph.map(render)}
		</svg>
	);
};

const renderWithProps = (props: Props) => (edge: DiEdge<string, [number, number]>) => {
	const {layout} = props.formula;
	const {source, target, data: indices} = edge;

	const srcPos: [number, number] = [0, 0];
	if (layout[source]) {
		srcPos[0] += layout[source][0];
		srcPos[1] += layout[source][1];
	}

	const dstPos: [number, number]  = [0, 0];
	if (layout[target]) {
		dstPos[0] = layout[target][0];
		dstPos[1] = layout[target][1];
	} else {
		dstPos[0] = formulaLayoutWidth(layout);
	}

	if (source === "input") {
		srcPos[1] += panelHeaderRows;
	} else {
		srcPos[0] += nodeWidth;
		srcPos[1] += nodeHeaderRows;
	}

	if (target === "output") {
		dstPos[1] += panelHeaderRows;
	} else {
		dstPos[1] += nodeHeaderRows;
		const dstFunc = props.nodes[target].function;
		dstPos[1] += (props.formulas[dstFunc] || PRIMITIVES[dstFunc]).outputNames.length;
	}
	srcPos[1] += indices[0];
	dstPos[1] += indices[1];

	return (
		<Wire
			srcPos={srcPos}
			dstPos={dstPos}
			key={`${source}@${indices[0]}-${target}@${indices[1]}`}
		/>
	);
};


export {WireLayer};
