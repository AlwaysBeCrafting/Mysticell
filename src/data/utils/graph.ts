import { Dict } from "common/types";
import { patchArray } from "common/utils";

import { FormulaGraph, Param, PARAMS } from "data/common";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { PRIMITIVES } from "data/Primitive";


interface ExecState {
	nodeInputs: Map<string, number>;
	nodeUserValues: Map<string, Param[]>;
	readyNodeInputs: Map<string, Param[]>;
	readyNodeOutputs: Map<string, Param[]>;
	compositeGraph: FormulaGraph;
}

const firstKey = (obj: any): string | undefined => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) { return key; }
	}
	return undefined;
};

const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.data[1]], [])
);

const createExecState = (nodes: Dict<Node>, graph: FormulaGraph, params: Param[]): ExecState => ({
	nodeInputs: graph.reduce(
		(prior: Map<string, number>, edge) => {
			prior.set(edge.target, (prior.get(edge.target) || 0) + 1);
			return prior;
		},
		new Map(),
	),
	nodeUserValues: graph.reduce(
		(prior: Map<string, Param[]>, edge) => (
			edge.target === "output" || prior.has(edge.target)
				? prior
				: prior.set(
					edge.target,
					nodes[edge.target].userValues
						.map(val => PARAMS.string(val)),
				)
		),
		new Map(),
	),
	readyNodeInputs: graph.reduce(
		(prior: Map<string, Param[]>, edge) => prior.set(edge.target, []),
		new Map(),
	),
	readyNodeOutputs: new Map().set("input", params),
	compositeGraph: [...graph],
});

const nodeHasAllInputs = (state: ExecState, nodeId: string): boolean => (
	(state.readyNodeInputs.get(nodeId) || []).length >= (state.nodeInputs.get(nodeId) || 0)
);

const execIsFinished = (state: ExecState): boolean => (
	nodeHasAllInputs(state, "output") ||
		Object.keys(state.readyNodeOutputs).length === 0
);

const finalizeNode = (state: ExecState, doc: Document, node: Node) => {
	const primitive = PRIMITIVES[node.function];
	const formula = doc.formulas[node.function];
	if (primitive) {
		state.readyNodeOutputs.set(
			node.id,
			primitive.exec(...patchArray(
				state.nodeUserValues.get(node.id) || [],
				state.readyNodeInputs.get(node.id) || [],
			)),
		);
	} else {
		if (formula) {
			state.compositeGraph = mergeGraphs(
				state.compositeGraph,
				doc.formulas[node.function].graph,
				node.id,
			);
		} else {
			state.readyNodeOutputs.set(node.id, state.readyNodeInputs.get(node.id) || []);
		}
	}
};

const mergeGraphs = (base: FormulaGraph, subgraph: FormulaGraph, nodeId: string): FormulaGraph => {
	const mergedBase = base
		.map(edge => {
			const newEdge = {...edge};
			if (edge.source === nodeId) { newEdge.source = `${nodeId}-output`; }
			if (edge.target === nodeId) { newEdge.target = `${nodeId}-input`; }
			return newEdge;
		});
	const mergedSub = subgraph
		.map(edge => {
			const newEdge = {...edge};
			if (edge.source === "input") { newEdge.source = `${nodeId}-input`; }
			if (edge.target === "output") { newEdge.target = `${nodeId}-output`; }
			return newEdge;
		});
	return {...mergedBase, ...mergedSub};
};

const execFormula = async (doc: Document, formulaId: string, ...params: Param[]): Promise<Param[]> => {
	const {nodes, formulas} = doc;
	const formula = formulas[formulaId];
	const {graph} = formula;
	const state = createExecState(nodes, graph, params);

	while (!execIsFinished(state)) {
		const currentNodeId = firstKey(state.readyNodeOutputs);
		if (!currentNodeId) { break; }
		state.compositeGraph.map(edge => {
			if (edge.source !== currentNodeId) { return; }
			const {source, target} = edge;
			const [srcIndex, tgtIndex] = edge.data;
			const outputs = state.readyNodeOutputs.get(source) || [];
			const inputs = state.readyNodeInputs.get(target) || [];
			inputs[tgtIndex] = outputs[srcIndex];
			state.readyNodeInputs.set(target, inputs);
			if (edge.target !== "output" && nodeHasAllInputs(state, edge.target)) {
				finalizeNode(state, doc, doc.nodes[edge.target]);
			}
		});
		state.readyNodeOutputs.delete(currentNodeId);
	}
	if ((state.readyNodeInputs.get("output") || []).length === state.nodeInputs.get("output") || 0) {
		return state.readyNodeInputs.get("output") || [];
	} else {
		return Array(formula.outputNames.length)
			.fill(PARAMS.error("FUNC", "Could not resolve function"));
	}
};


export { connectedInputs, execFormula };
