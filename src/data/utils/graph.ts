import {Dict} from "common/types";
import {patchArray} from "common/utils";

import {FormulaGraph, Param, PARAMS} from "data/common";
import {Document} from "data/Document";
import {Node} from "data/Node";
import {PRIMITIVES} from "data/Primitive";


interface ExecState {
	nodeInputs: Dict<number>;
	nodeUserValues: Dict<Param[]>;
	readyNodeInputs: Dict<Param[]>;
	readyNodeOutputs: Dict<Param[]>;
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
		(prior, edge) => {
			prior[edge.target] = (prior[edge.target] || 0) + 1;
			return prior;
		},
		{},
	),
	nodeUserValues: graph.reduce(
		(prior, edge) => {
			if (edge.target === "output") { return prior; }
			prior[edge.target] = prior[edge.target] ||
				nodes[edge.target].userValues
					.map(val => PARAMS.string(val));
			return prior;
		},
		{},
	),
	readyNodeInputs: graph.reduce(
		(prior, edge) => {
			prior[edge.target] = [];
			return prior;
		},
		{},
	),
	readyNodeOutputs: {input: params},
	compositeGraph: [...graph],
});

const nodeHasAllInputs = (state: ExecState, nodeId: string): boolean => (
	state.readyNodeInputs[nodeId].length >= state.nodeInputs[nodeId]
);

const execIsFinished = (state: ExecState): boolean => (
	nodeHasAllInputs(state, "output") ||
	Object.keys(state.readyNodeOutputs).length === 0
);

const finalizeNode = (state: ExecState, doc: Document, node: Node) => {
	const primitive = PRIMITIVES[node.function];
	const formula = doc.formulas[node.function];
	if (primitive) {
		state.readyNodeOutputs[node.id] = primitive.exec(
			...patchArray(state.nodeUserValues[node.id], state.readyNodeInputs[node.id]),
		);
	} else {
		if (formula) {
			state.compositeGraph = mergeGraphs(
				state.compositeGraph,
				doc.formulas[node.function].graph,
				node.id,
			);
		} else {
			state.readyNodeOutputs[node.id] = state.readyNodeInputs[node.id];
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

const execFormula = (doc: Document, formulaId: string, ...params: Param[]) => {
	const {nodes, formulas} = doc;
	const formula = formulas[formulaId];
	const {graph} = formula;
	const state = createExecState(nodes, graph, params);

	while (!execIsFinished(state)) {
		const currentNodeId = firstKey(state.readyNodeOutputs);
		if (!currentNodeId) { break; }
		state.compositeGraph.map(edge => {
			if (edge.source !== currentNodeId) { return; }
			state.readyNodeInputs[edge.target][edge.data[1]] = (
				state.readyNodeOutputs[edge.source][edge.data[0]]
			);
			if (edge.target !== "output" && nodeHasAllInputs(state, edge.target)) {
				finalizeNode(state, doc, doc.nodes[edge.target]);
			}
		});
		delete state.readyNodeOutputs[currentNodeId];
	}
	if (state.readyNodeInputs.output.length === state.nodeInputs.output) {
		return state.readyNodeInputs.output;
	} else {
		return Array(formula.outputNames.length)
			.fill(PARAMS.error("Could not resolve function"));
	}
};


export {connectedInputs, execFormula};
