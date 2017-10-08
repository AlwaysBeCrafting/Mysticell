import { Dict } from "common/types";
import { Param, PARAMS } from "data/common";
import { Document } from "data/Document";
import { Formula } from "data/Formula";
import { Node } from "data/Node";
import { PRIMITIVES } from "data/Primitive";


interface Edge {
	target: string;
	data: [number, number];
}

interface BoundaryNode {
	id: "input" | "output";
	inputs: Array<Param | undefined>;
	edges: Edge[];
	inputNodes: string[];
}

interface GraphNode {
	id: string;
	inputs: Array<Param | undefined>;
	edges: Edge[];
	inputNodes: string[];
	templateRef: Node;
}

type EvalNode = BoundaryNode | GraphNode;
type EvalGraph = Dict<EvalNode>;

const isBoundaryNode = (node: EvalNode): node is BoundaryNode => node.id === "input" || node.id === "output";

const countInputs = (doc: Document, id: string) => {
	const primitive = PRIMITIVES[id];
	return primitive
		? primitive.inputNames.length
		: doc.formulas[id].inputNames.length;
};

const makeBoundaryNode = (id: "input" | "output", params: Param[]): BoundaryNode => ({
	id,
	inputs: params,
	edges: [],
	inputNodes: [],
});

const makeEvalNode = (id: string, doc: Document): EvalNode => {
	const templateRef = doc.nodes[id];
	return {
		id,
		inputs: templateRef.userValues.map(PARAMS.string) || Array(countInputs(doc, id)),
		edges: [],
		inputNodes: [],
		templateRef,
	};
};

const constructEvaluationGraph = (doc: Document, formula: Formula, inputParams?: Param[]) => {
	const graph = formula.graph;
	const newGraph: Dict<EvalNode> = {
		input: makeBoundaryNode("input", inputParams || doc.propertyInputs[formula.id].map(PARAMS.string)),
		output: makeBoundaryNode("output", Array(formula.outputNames.length)),
	};

	for (const edge of graph) {
		const targetNode = newGraph[edge.target] || makeEvalNode(edge.target, doc);
		targetNode.inputNodes.push(edge.source);
		newGraph[edge.target] = targetNode;

		const sourceNode = newGraph[edge.source] || makeEvalNode(edge.source, doc);
		sourceNode.edges.push({ target: targetNode.id, data: edge.data });
		newGraph[edge.source] = sourceNode;
	}

	return newGraph;
};


export { Edge, EvalNode, EvalGraph, isBoundaryNode, makeBoundaryNode, makeEvalNode, constructEvaluationGraph };
