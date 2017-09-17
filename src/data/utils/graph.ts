import {patchArray} from "common/util";

import {FormulaGraph, Param, PARAMS} from "data/common";
import {Document} from "data/Document";
import {Node} from "data/Node";
import {PRIMITIVES} from "data/Primitive";


const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.edge[1]], [])
);

const execFormula = (doc: Document) => {
	const makeFunc = (funcId: string) => (
		PRIMITIVES[funcId].exec || exec(funcId)
	);
	const exec = (formulaId: string) => (...params: Param[]): Param[] => {
		const resolveInputs = (tgtId: string): Param[] => {
			if (tgtId === "input") { return params; }
			const {graph} = doc.formulas[formulaId];
			const userParams = doc.nodes[tgtId].userValues
				.map(val => PARAMS.string(val));
			const inputParams = graph
				.filter(e => e.target === tgtId)
				.map(e => [doc.nodes[e.source], e.edge[0]] as [Node, number])
				.map(src => (
					makeFunc(src[0].function)(...resolveInputs(src[0].id))[src[1]]
				));
			const actualParams = patchArray(userParams, inputParams);
			return makeFunc(doc.nodes[tgtId].function)(...actualParams);
		};
		return resolveInputs("output");
	};
	return exec;
};


export {connectedInputs, execFormula};
