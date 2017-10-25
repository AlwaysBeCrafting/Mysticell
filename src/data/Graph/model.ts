import { Dict } from "common/types";

interface Edge {
  target: string;
  data: [number, number];
}

interface CommonNodeProperties {
  id: string;
  edges: Edge[];
}

interface BoundaryNode extends CommonNodeProperties {
  id: "input" | "output";
}

interface InnerNode extends CommonNodeProperties {
  prototype: string;
  label?: string;
  constants: string[];
}

type GraphNode = BoundaryNode | InnerNode;

type Graph = Dict<GraphNode>;

const isBoundaryNode = (node: GraphNode): node is BoundaryNode =>
  node.id === "input" || node.id === "output";
const isInnerNode = (node: GraphNode): node is InnerNode =>
  !isBoundaryNode(node);

export { Edge, BoundaryNode, InnerNode, GraphNode, Graph };
export { isBoundaryNode, isInnerNode };
