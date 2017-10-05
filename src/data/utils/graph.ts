import { Dict } from "common/types";

import { FormulaGraph, Param, PARAMS } from "data/common";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { PRIMITIVES } from "data/Primitive";


const resolveProperty = async (doc: Document, propertyId: string): Promise<Param[]> => {
	const { formulas, nodes } = doc;
	const dependencyQueue = ["output"];
	const resolutionQueue: string[] = [];
	const visited: Set<string> = new Set();
	const outputParams: Dict<Param[]> = {};

	let graph = [...doc.formulas[propertyId].graph];

	let hasTranscluded = false;
	do {
		// tslint:disable-next-line:no-console
		console.log("loop start");
		hasTranscluded = false;
		const formulaNodes: Set<Node> = new Set(
			graph
				.filter(edge => (
					!!nodes[edge.source] &&
					!!formulas[nodes[edge.source].function]
				))
				.map(edge => nodes[edge.source]),
		);
		formulaNodes
			.forEach(node => {
				graph = transclude(
					graph,
					formulas[node.function].graph,
					node.id,
				);
				hasTranscluded = true;
			});
			// tslint:disable-next-line:no-console
			console.log("loop end");
	} while (hasTranscluded);

	while (dependencyQueue.length > 0) {
		const nodeId = dependencyQueue.shift() as string;
		if (visited.has(nodeId)) {
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
		if (!dependencyQueue.includes(nodeId)) { visited.add(nodeId); }
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
					return getDependedParams(graph, outputParams, "output");
				}
				default: {
					const dependedParams = getDependedParams(graph, outputParams, nodeId);
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

const getDependedParams = (graph: FormulaGraph, outputParams: Dict<Param[]>, nodeId: string) => {
	const params: Param[] = [];
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
	// tslint:disable-next-line:no-console
	console.log(`transcluding node ${nodeId}`);
	const baseInputs = baseGraph
		.filter(edge => edge.target === nodeId)
		.map(edge => ({...edge, target: `PROXY-IN-${nodeId}`}));
	const baseOutputs = baseGraph
		.filter(edge => edge.source === nodeId)
		.map(edge => ({...edge, source: `PROXY-OUT-${nodeId}`}));
	const subInputs = subGraph
		.filter(edge => edge.source === "input")
		.map(edge => ({...edge, source: `PROXY-IN-${nodeId}`}));
	const subOutputs = subGraph
		.filter(edge => edge.target === "output")
		.map(edge => ({...edge, target: `PROXY-OUT-${nodeId}`}));
	return [
		...baseGraph.filter(edge => !(edge.source === nodeId || edge.target === nodeId)),
		...baseInputs,
		...baseOutputs,
		...subGraph.filter(edge => !(edge.source === "input" || edge.source === "output")),
		...subInputs,
		...subOutputs,
	];
};


// class resolveProperty {
// 	private doc: Document;
// 	private propertyId: string;
// 	private nodeInputs: Map<string, number>;
// 	private nodeUserValues: Map<string, Param[]>;
// 	private readyNodeInputs: Map<string, Param[]>;
// 	private readyNodeOutputs: Map<string, Param[]>;
// 	private compositeGraph: FormulaGraph;

// 	constructor(doc: Document, propertyId: string) {
// 		this.doc = doc;
// 		this.propertyId = propertyId;
// 		const { nodes, formulas } = doc;
// 		const property = formulas[propertyId];
// 		const graph = property.graph;
// 		const params = doc.propertyInputs[propertyId].map(input => PARAMS.string(input));
// 		this.nodeInputs = graph.reduce(
// 			(prior: Map<string, number>, edge) => {
// 				prior.set(edge.target, (prior.get(edge.target) || 0) + 1);
// 				return prior;
// 			},
// 			new Map(),
// 		);
// 		this.nodeUserValues = graph.reduce(
// 			(prior: Map<string, Param[]>, edge) => (
// 				edge.target === "output" || prior.has(edge.target)
// 					? prior
// 					: prior.set(
// 						edge.target,
// 						nodes[edge.target].userValues
// 							.map(val => PARAMS.string(val)),
// 					)
// 			),
// 			new Map(),
// 		);
// 		this.readyNodeInputs = graph.reduce(
// 			(prior: Map<string, Param[]>, edge) => prior.set(edge.target, []),
// 			new Map(),
// 		);
// 		this.readyNodeOutputs = new Map().set("input", params);
// 		this.compositeGraph = [...graph];
// 	}

// 	public async resolve() {
// 		const { formulas, nodes } = this.doc;
// 		const formula = formulas[this.propertyId];
// 		if (!formula.isProperty) {
// 			throw new Error("Cannot resolveProperty() with a non-property function");
// 		}

// 		while (!this.isDone()) {
// 			const currentNodeId = this.readyNodeOutputs.keys().next().value;
// 			if (!currentNodeId) { break; }
// 			this.compositeGraph.forEach(edge => {
// 				if (edge.source !== currentNodeId) { return; }
// 				const {source, target} = edge;
// 				const [srcIndex, tgtIndex] = edge.data;
// 				const outputs = this.readyNodeOutputs.get(source) || [];
// 				const inputs = this.readyNodeInputs.get(target) || [];
// 				inputs[tgtIndex] = outputs[srcIndex];
// 				this.readyNodeInputs.set(target, inputs);
// 				if (edge.target !== "output" && this.nodeHasAllInputs(edge.target)) {
// 					const node = nodes[edge.target];
// 					if (PRIMITIVES[node.function]) {
// 						this.readyNodeOutputs.set(
// 							node.id,
// 							PRIMITIVES[node.function].exec(...patchArray(
// 								this.nodeUserValues.get(node.id) || [],
// 								this.readyNodeInputs.get(node.id) || [],
// 							)),
// 						);
// 					} else if (this.doc.formulas[node.function]) {
// 						this.compositeGraph = mergeGraphs(
// 							this.compositeGraph,
// 							this.doc.formulas[node.function].graph,
// 							node.id,
// 						);
// 					} else {
// 						this.readyNodeOutputs.set(
// 							node.id,
// 							this.readyNodeInputs.get(node.id) || [],
// 						);
// 					}
// 				}
// 			});
// 			this.readyNodeOutputs.delete(currentNodeId);
// 		}
// 		if ((this.readyNodeInputs.get("output") || []).length === this.nodeInputs.get("output") || 0) {
// 			return this.readyNodeInputs.get("output") || [];
// 		} else {
// 			return Array(formula.outputNames.length)
// 				.fill(PARAMS.error("FUNC", "Could not resolve function"));
// 		}
// 	}

// 	private nodeHasAllInputs(nodeId: string): boolean {
// 		return (
// 			(this.readyNodeInputs.get(nodeId) || []).length
// 				>= (this.nodeInputs.get(nodeId) || 0)
// 		);
// 	}

// 	private isDone() {
// 		return this.nodeHasAllInputs("output") || this.readyNodeOutputs.size === 0;
// 	}
// }

const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.data[1]], [])
);

// const mergeGraphs = (base: FormulaGraph, subgraph: FormulaGraph, nodeId: string): FormulaGraph => {
// 	const mergedBase = base
// 		.map(edge => {
// 			const newEdge = {...edge};
// 			if (edge.source === nodeId) { newEdge.source = `${nodeId}-output`; }
// 			if (edge.target === nodeId) { newEdge.target = `${nodeId}-input`; }
// 			return newEdge;
// 		});
// 	const mergedSub = subgraph
// 		.map(edge => {
// 			const newEdge = {...edge};
// 			if (edge.source === "input") { newEdge.source = `${nodeId}-input`; }
// 			if (edge.target === "output") { newEdge.target = `${nodeId}-output`; }
// 			return newEdge;
// 		});
// 	return [...mergedBase, ...mergedSub];
// };


export { connectedInputs, resolveProperty };
