import classNames from "classnames";
import React from "react";

import {IdMap} from "common/types";
import {formulaLayoutWidth} from "common/util";

import {Wire} from "components/atoms";

import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {PRIMITIVES} from "data/Primitive/constants";


const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

interface Props {
	formula: Formula;
	formulas: IdMap<Formula>;
	nodes: IdMap<Node>;
	className?: string;
}

const WireLayer = (props: Props) => {
	const {formula, className} = props;
	const render = renderWithProps(props);
	return (
		<svg className={classNames("wireLayer", className)}>
			{Object.keys(formula.graph).map(render)}
		</svg>
	);
};

const renderWithProps = (props: Props) => (
	(srcId: string) => renderFromSrc(props, srcId)
);

const renderFromSrc = (props: Props, srcId: string) => {
	const render = (dstId: string) => renderToDst(props, srcId, dstId);
	const src = props.formula.graph[srcId];
	return Object.keys(src).map(render);
};

const renderToDst = (props: Props, srcId: string, dstId: string) => {
	const render = (indices: [number, number]) => renderWire(props, srcId, dstId, indices);
	const dst = props.formula.graph[srcId][dstId];
	return dst.map(render);
};

const renderWire = (props: Props, srcId: string, dstId: string, indices: [number, number]) => {
	const {layout} = props.formula;

	const srcPos: [number, number] = [0, 0];
	if (layout[srcId]) {
		srcPos[0] += layout[srcId][0];
		srcPos[1] += layout[srcId][1];
	}

	const dstPos: [number, number]  = [0, 0];
	if (layout[dstId]) {
		dstPos[0] = layout[dstId][0];
		dstPos[1] = layout[dstId][1];
	} else {
		dstPos[0] = formulaLayoutWidth(layout);
	}

	if (srcId === "input") {
		srcPos[1] += panelHeaderRows;
	} else {
		srcPos[0] += nodeWidth;
		srcPos[1] += nodeHeaderRows;
	}

	if (dstId === "output") {
		dstPos[1] += panelHeaderRows;
	} else {
		dstPos[1] += nodeHeaderRows;
		const dstFunc = props.nodes[dstId].function;
		dstPos[1] += (props.formulas[dstFunc] || PRIMITIVES[dstFunc]).outputNames.length;
	}
	srcPos[1] += indices[0];
	dstPos[1] += indices[1];

	return (
		<Wire
			srcPos={srcPos}
			dstPos={dstPos}
			key={`${srcId}@${indices[0]}-${dstId}@${indices[1]}`}
		/>
	);
};


export {WireLayer};
