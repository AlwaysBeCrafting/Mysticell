import { List, Map } from "immutable";

import { Dict } from "common/types";

import { Param, PARAMS, PRIMITIVES } from "data/common";
import {
  GraphNodePrototype,
  NodePrototype,
  PropertyNodePrototype,
} from "data/NodePrototype";

import { BoundaryNode, Edge, Graph, InnerNode, isBoundaryNode } from "./model";

interface EvalGraph extends Dict<EvalNode> {}

interface BoundaryEvalNode {
  node: BoundaryNode;
  inputs: Array<Param | undefined>;
  inputNodes: string[];
  edges: EvalEdge[];
}

interface InnerEvalNode {
  node: InnerNode;
  inputs: Array<Param | undefined>;
  inputNodes: string[];
  edges: EvalEdge[];
}

type EvalNode = BoundaryEvalNode | InnerEvalNode;

interface EvalEdge {
  edge: Edge;
  targetNode: EvalNode;
}

const makeInputNode = (
  inputNode: BoundaryNode,
  inputs: Array<Param | undefined>,
): BoundaryEvalNode => ({
  node: inputNode,
  inputs,
  inputNodes: [],
  edges: inputNode.edges
    .map(edge => ({ edge, targetNode: undefined! }))
    .toArray(),
});

const makeOutputNode = (
  inputs: Array<Param | undefined>,
  outputEdges?: EvalEdge[],
): BoundaryEvalNode => ({
  node: new BoundaryNode({ id: "output" }),
  inputs,
  inputNodes: [],
  edges: outputEdges || [],
});

const makeEvalNode = (graph: Graph, nodeId: string): InnerEvalNode => {
  const node = graph.get(nodeId) as InnerNode;
  return {
    node,
    inputs: node.constants.map(PARAMS.string).toArray(),
    inputNodes: [],
    edges: node.edges.map(edge => ({ edge, targetNode: undefined! })).toArray(),
  };
};

const constructEvaluationGraph = (
  prototype: GraphNodePrototype,
  inputParams: Param[],
  outputEdges?: EvalEdge[],
) => {
  const graph = prototype.graph;
  const evalGraph: Dict<EvalNode> = {
    input: makeInputNode(graph.get("input") as BoundaryNode, inputParams),
    output: makeOutputNode(
      Array(prototype.outputNames.size).fill(undefined),
      outputEdges,
    ),
  };

  for (const node of graph.values()) {
    const sourceEvalNode = evalGraph[node.id] || makeEvalNode(graph, node.id);
    evalGraph[node.id] = sourceEvalNode;

    for (const edge of sourceEvalNode.edges) {
      const targetEvalNode =
        evalGraph[edge.edge.target] || makeEvalNode(graph, edge.edge.target);
      targetEvalNode.inputNodes.push(node.id);
      evalGraph[edge.edge.target] = targetEvalNode;
      edge.targetNode = targetEvalNode;
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

const hasCyclesUntil = (
  graph: EvalGraph,
  evalNode: EvalNode,
  visited: Set<string>,
  stack: Set<string>,
) => {
  visited.add(evalNode.node.id);
  stack.add(evalNode.node.id);

  // A directed graph only has a cycle if it has a back-edge in its DFS tree
  for (const neighbor of evalNode.node.edges) {
    const target = neighbor.target;
    if (
      !visited.has(target) &&
      hasCyclesUntil(graph, graph[target], visited, stack)
    ) {
      return true;
    } else if (stack.has(target)) {
      return true;
    }
  }

  stack.delete(evalNode.node.id);
  return false;
};

const hasCycles = (graph: EvalGraph, startingNodes: EvalNode[]) =>
  startingNodes.some(startingNode =>
    hasCyclesUntil(graph, startingNode, new Set(), new Set()),
  );

const gatherReadyNodes = (
  evalNode: EvalNode,
  value: Array<Param | undefined>,
) => {
  const readyNodes = [];
  for (const evalEdge of evalNode.edges) {
    const target = evalEdge.targetNode;
    const { src, dst } = evalEdge.edge.index;

    if (value[src] != null) {
      target.inputs[dst] = value[src];
    }

    if (isNodeReady(target)) {
      readyNodes.push(target);
    }
  }
  return readyNodes;
};

type EvalResult =
  | { type: "expansion"; nodes: EvalNode[] }
  | { type: "value"; value: Param[] };

const evaluate = async (
  nodePrototypes: Map<string, NodePrototype>,
  evalNode: EvalNode,
): Promise<EvalResult> => {
  const inputs: Param[] = evalNode.inputs as Param[];
  if (isBoundaryNode(evalNode.node)) {
    return { type: "value", value: inputs };
  }

  const prototype = nodePrototypes.get(
    evalNode.node.prototype,
  ) as GraphNodePrototype;
  const primitive = PRIMITIVES[evalNode.node.prototype];
  return primitive
    ? {
        type: "value",
        value: primitive.evaluate(List(inputs)).toArray(),
      }
    : {
        type: "expansion",
        nodes: shallowExpand(prototype, inputs, evalNode.edges)[1],
      };
};

const resolveGraph = async (
  nodePrototypes: Map<string, NodePrototype>,
  prototype: PropertyNodePrototype,
): Promise<List<Param>> => {
  const params = prototype.inputValues.map(PARAMS.string);
  const [graph, wavefront] = shallowExpand(prototype, params.toArray());

  if (hasCycles(graph, wavefront)) {
    return prototype.outputNames.map(_ =>
      PARAMS.error("FUNC", "Graph cannot contain cycles"),
    );
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

  return List(graph.output.inputs).map(
    param =>
      param
        ? param as Param
        : PARAMS.error("FUNC", "The graph cannot return undefined values"),
  );
};

const isEdgeTarget = (graph: Graph, nodeId: string, index?: number) => {
  for (const node of graph.values()) {
    for (const edge of node.edges) {
      if (
        edge.target === nodeId &&
        (typeof index === "undefined" || index === edge.index.dst)
      ) {
        return true;
      }
    }
  }
  return false;
};

export { resolveGraph, isEdgeTarget };
