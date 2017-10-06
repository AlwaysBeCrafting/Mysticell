import { Dict } from "common/types";

import { FormulaGraph, Param, PARAMS } from "data/common";
import { Document } from "data/Document";
import { PRIMITIVES } from "data/Primitive";


const resolveProperty = async (doc: Document, propertyId: string): Promise<Param[]> => {
	const { formulas, nodes } = doc;
	const dependencyQueue = ["output"];
	const resolutionQueue: string[] = [];
	const visitCount: Dict<number> = {};
	const visited: Set<string> = new Set();
	const outputParams: Dict<Param[]> = {};

	let graph = [...doc.formulas[propertyId].graph];

	let hasTranscluded = false;
	do {
		hasTranscluded = false;
		const formulaEdge = graph
			.find(edge => (
				!!nodes[edge.source] &&
				!!formulas[nodes[edge.source].function]
			));
		if (formulaEdge) {
			const nodeId = formulaEdge.source;
			const formula = formulas[nodes[nodeId].function];
			graph = transclude(
				graph,
				formula.graph,
				nodeId,
			);
			hasTranscluded = true;
		}
	} while (hasTranscluded);

	while (dependencyQueue.length > 0) {
		const nodeId = dependencyQueue.shift() as string;
		if (visitCount[nodeId] >= graph.filter(edge => edge.source === nodeId).length) {
			return Array(doc.formulas[propertyId].outputNames.length)
				.fill(PARAMS.error(
					"FUNC",
					`"${doc.formulas[propertyId].name}" contains a cycle`,
				));
		}
		const bumpedIndices = dependencyQueue
			.map((target, i) => target === nodeId ? i : -1)
			.filter(i => i >= 0);
		const deps = graph
			.filter(edge => edge.target === nodeId)
			.map(edge => edge.source);
		multiSplice(dependencyQueue, bumpedIndices);
		dependencyQueue.push(...deps);
		resolutionQueue.unshift(nodeId);
		visitCount[nodeId] = (visitCount[nodeId] || 0) + 1;
	}
	visited.clear();
	while (resolutionQueue.length > 0) {
		const nodeId = resolutionQueue.shift() as string;
		if (!visited.has(nodeId)) {
			switch (nodeId) {
				case "input": {
					outputParams[nodeId] = doc.propertyInputs[propertyId]
						.map(str => PARAMS.string(str));
					break;
				}
				case "output": {
					return getInputParams(doc, graph, outputParams, "output");
				}
				default: {
					const dependedParams = getInputParams(doc, graph, outputParams, nodeId);
					const node = nodes[nodeId];
					if (node) {
						const primitive = PRIMITIVES[nodes[nodeId].function];
						const params = primitive.exec(...dependedParams);
						outputParams[nodeId] = params;
					} else {
						outputParams[nodeId] = dependedParams;
					}
					break;
				}
			}
			visited.add(nodeId);
		}
	}
	return Array(doc.formulas[propertyId].outputNames.length)
		.fill(PARAMS.error(
			"FUNC",
			`Didn't resolve property "${doc.formulas[propertyId].name}" correctly`,
		));
};

const getInputParams = (doc: Document, graph: FormulaGraph, outputParams: Dict<Param[]>, nodeId: string) => {
	const node = doc.nodes[nodeId];
	const params: Param[] = node
		? node.userValues.map(str => PARAMS.string(str))
		: [];
	graph
		.filter(edge => edge.target === nodeId)
		.forEach(edge => {
			params[edge.data[1]] = outputParams[edge.source][edge.data[0]];
		});
	return params;
};

const multiSplice = <T>(array: T[], indices: number[]) => {
	indices
		.sort((a, b) => a - b)
		.forEach((index, i) => array.splice(index - i, 1));
};

const transclude = (baseGraph: FormulaGraph, subGraph: FormulaGraph, nodeId: string): FormulaGraph => {
	const baseInputs = baseGraph
		.filter(edge => edge.target === nodeId)
		.map(edge => ({...edge, target: `BOUND-IN-${nodeId}`}));
	const baseOutputs = baseGraph
		.filter(edge => edge.source === nodeId)
		.map(edge => ({...edge, source: `BOUND-OUT-${nodeId}`}));
	const subInputs = subGraph
		.filter(edge => edge.source === "input")
		.map(edge => ({...edge, source: `BOUND-IN-${nodeId}`}));
	const subOutputs = subGraph
		.filter(edge => edge.target === "output")
		.map(edge => ({...edge, target: `BOUND-OUT-${nodeId}`}));
	return [
		...baseGraph.filter(edge => !(edge.source === nodeId || edge.target === nodeId)),
		...baseInputs,
		...baseOutputs,
		...subGraph.filter(edge => !(edge.source === "input" || edge.target === "output")),
		...subInputs,
		...subOutputs,
	];
};

const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.data[1]], [])
);


export { connectedInputs, resolveProperty };
