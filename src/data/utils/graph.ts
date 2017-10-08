import { FormulaGraph, Param, PARAMS } from "data/common";
import { Document } from "data/Document";
import { PRIMITIVES } from "data/Primitive";
import {
	constructEvaluationGraph,
	EvalGraph,
	EvalNode,
	isBoundaryNode,
} from "data/utils/eval-graph";


const isNodeReady = (node: EvalNode) =>
	node.inputs.every(input => input != null && input.type !== "error");

const findStartingNodes = (nodes: EvalNode[]) => nodes
	.filter(node => node.inputNodes.length === 0)
	.sort(node => node.id === "input" ? -1 : 1);

const hasCyclesUntil = (graph: EvalGraph, node: EvalNode, visited: Set<string>, stack: Set<string>) => {
	visited.add(node.id);
	stack.add(node.id);

	// A directed graph only has a cycle if it has a back-edge in its DFS tree
	for (const neighbor of node.edges) {
		const target = neighbor.target;
		if (!visited.has(target) && hasCyclesUntil(graph, graph[target], visited, stack)) {
			return true;
		} else if (stack.has(target)) {
			return true;
		}
	}

	stack.delete(node.id);
	return false;
};

const hasCycles = (graph: EvalGraph, startingNodes: EvalNode[]) => (
	startingNodes.some(startingNode => hasCyclesUntil(graph, startingNode, new Set(), new Set()))
);

const gatherReadyNodes = (graph: EvalGraph, node: EvalNode, value: Array<Param | undefined>) => {
	const readyNodes = [];
	for (const edge of node.edges) {
		const target = graph[edge.target];
		const [sourceIndex, targetIndex] = edge.data;

		if (value[sourceIndex] != null) {
			target.inputs[targetIndex] = value[sourceIndex];
		}

		if (isNodeReady(target)) {
			readyNodes.push(target);
		}
	}
	return readyNodes;
};

const evaluate = async (doc: Document, node: EvalNode): Promise<Param[]> => {
	if (isBoundaryNode(node)) {
		return node.inputs as Param[];
	}

	const primitive = PRIMITIVES[node.templateRef.function];
	return primitive
		? primitive.exec(...node.inputs as Param[])
		: resolveProperty(doc, node.templateRef.function, node.inputs as Param[]);
};

const resolveProperty = async (doc: Document, formulaId: string, inputParams?: Param[]): Promise<Param[]> => {
	const { formulas } = doc;
	const formula = formulas[formulaId];
	const graph = constructEvaluationGraph(doc, formula, inputParams);
	const wavefront = findStartingNodes(Object.values(graph));

	if (hasCycles(graph, wavefront)) {
		return new Array(graph.output.inputs.length)
			.fill(PARAMS.error("FUNC", "Graph cannot have cyclic dependencies"));
	}

	while (wavefront.length !== 0) {
		const node = wavefront.pop()!;
		const value = await evaluate(doc, node);
		wavefront.push(...gatherReadyNodes(graph, node, value));
	}

	return graph.output.inputs
		.map(output => typeof output === "undefined"
			? PARAMS.error("FUNC", "The graph cannot return undefined values")
			: output as Param,
		);
};

const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.data[1]], [])
);


export { connectedInputs, resolveProperty };
