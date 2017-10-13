import { Dict } from "common/types";

import { Param, PARAMS, PRIMITIVES } from "data/common";
import {
	GraphNodePrototype,
	NodePrototype,
	PropertyNodePrototype,
} from "data/NodePrototype";

import {
	BoundaryNode,
	Edge,
	Graph,
	InnerNode,
	isBoundaryNode,
} from "./model";


interface EvalGraph extends Dict<EvalNode> {}

interface BoundaryEvalNode extends BoundaryNode {
	id: "input" | "output";
	inputs: Array<Param | undefined>;
	inputNodes: string[];
	edges: EvalEdge[];
}

interface InnerEvalNode extends InnerNode {
	inputs: Array<Param | undefined>;
	inputNodes: string[];
	edges: EvalEdge[];
}

type EvalNode =
	| BoundaryEvalNode
	| InnerEvalNode;

interface EvalEdge extends Edge {
	targetNode: EvalNode;
}

const makeInputNode = (
	inputNode: BoundaryNode,
	inputs: Array<Param | undefined>,
): BoundaryEvalNode => {
	const inputEvalNode = inputNode as BoundaryEvalNode;
	inputEvalNode.inputs = inputs;
	inputEvalNode.inputNodes = [];
	return inputEvalNode;
};

const makeOutputNode = (inputs: Array<Param | undefined>, outputEdges?: EvalEdge[]): BoundaryEvalNode => ({
	id: "output",
	inputs,
	inputNodes: [],
	edges: outputEdges || [],
});

const makeEvalNode = (graph: Graph, nodeId: string): InnerEvalNode => {
	const evalNode = graph[nodeId] as InnerEvalNode;
	evalNode.inputs = evalNode.constants.map(PARAMS.string);
	evalNode.inputNodes = [];
	return evalNode;
};

const extendGraphEdge = (edge: Edge, targetNode: EvalNode): EvalEdge => {
	const evalEdge = edge as EvalEdge;
	evalEdge.targetNode = targetNode;
	return evalEdge;
};

const constructEvaluationGraph = (
	prototype: GraphNodePrototype,
	inputParams: Param[],
	outputEdges?: EvalEdge[],
) => {
	const { graph } = prototype;
	const evalGraph: Dict<EvalNode> = {
		input: makeInputNode(graph.input as BoundaryNode, inputParams),
		output: makeOutputNode(Array(prototype.outputNames.length).fill(undefined), outputEdges),
	};

	for (const node of Object.values(graph)) {
		const sourceEvalNode = evalGraph[node.id] || makeEvalNode(graph, node.id);
		evalGraph[node.id] = sourceEvalNode;

		for (const edge of node.edges) {
			const targetEvalNode = evalGraph[edge.target] || makeEvalNode(graph, edge.target);
			targetEvalNode.inputNodes.push(node.id);
			evalGraph[edge.target] = targetEvalNode;
			extendGraphEdge(edge, targetEvalNode);
		}
	}

	return evalGraph;
};


const findStartingNodes = (nodes: EvalNode[]): EvalNode[] =>
	nodes.filter(node => node.inputNodes.length === 0);

const shallowExpand = (
	prototype: GraphNodePrototype,
	inputParams: Param[],
	outputEdges?: EvalEdge[],
): [EvalGraph, EvalNode[]] => {
	const graph = constructEvaluationGraph(prototype, inputParams, outputEdges);
	return [graph, findStartingNodes(Object.values(graph))];
};


const isNodeReady = (node: EvalNode) =>
	node.inputs.every(input => input != null && input.type !== "error");

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

const gatherReadyNodes = (node: EvalNode, value: Array<Param | undefined>) => {
	const readyNodes = [];
	for (const edge of node.edges) {
		const target = edge.targetNode;
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

type EvalResult =
	| { type: "expansion", nodes: EvalNode[] }
	| { type: "value", value: Param[] };

const evaluate = async (
	nodePrototypes: Dict<NodePrototype>,
	node: EvalNode,
): Promise<EvalResult> => {
	if (isBoundaryNode(node)) {
		return { type: "value", value: node.inputs as Param[] };
	}

	const prototype = nodePrototypes[node.prototype] as GraphNodePrototype;
	const primitive = PRIMITIVES[node.prototype];
	return primitive
		? {
			type: "value",
			value: primitive.evaluate(...node.inputs as Param[]),
		}
		: {
			type: "expansion",
			nodes: shallowExpand(prototype, node.inputs as Param[], node.edges)[1],
		};
};

const resolveGraph = async (
	nodePrototypes: Dict<NodePrototype>,
	prototype: PropertyNodePrototype,
): Promise<Param[]> => {
	const params = prototype.inputValues.map(PARAMS.string);
	const [graph, wavefront] = shallowExpand(prototype, params);

	if (hasCycles(graph, wavefront)) {
		return Array(prototype.outputNames.length)
			.fill(PARAMS.error("FUNC", "Graph cannot contain cycles"));
	}

	while (wavefront.length > 0) {
		const node = wavefront.pop()!;
		const result = await evaluate(nodePrototypes, node);
		if (result.type === "value") {
			wavefront.push(...gatherReadyNodes(node, result.value));
		} else {
			wavefront.unshift(...result.nodes);
		}
	}

	return graph.output.inputs
		.map(param => param
			? param as Param
			: PARAMS.error("FUNC", "The graph cannot return undefined values"));
};


const isEdgeTarget = (graph: Graph, nodeId: string, index?: number) => {
	for (const node of Object.values(graph)) {
		for (const edge of node.edges) {
			if (
				edge.target === nodeId &&
				(typeof index === "undefined" || index === edge.data[1])
			) {
				return true;
			}
		}
	}
	return false;
};


export { resolveGraph, isEdgeTarget };
