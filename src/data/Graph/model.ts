import { List, Map, Record } from "immutable";

import {
  BoundaryNodeJson,
  EdgeJson,
  GraphJson,
  InnerNodeJson,
  NodeJson,
  PinIndexJson,
} from "data/json";

class PinIndex extends Record<{ src: number; dst: number }>({
  src: 0,
  dst: 0,
}) {
  public static fromJson(json: PinIndexJson) {
    return new PinIndex({ src: json.src, dst: json.dst });
  }
}

interface EdgeProps {
  target: string;
  index: PinIndex;
}
class Edge extends Record<EdgeProps>({
  target: "",
  index: new PinIndex(),
}) {
  public static fromJson(json: EdgeJson) {
    return new Edge({
      target: json.target,
      index: PinIndex.fromJson(json.pinIndex),
    });
  }
}

interface CommonNodeProps {
  id: string;
  edges: List<Edge>;
}

interface BoundaryNodeProps extends CommonNodeProps {
  id: "input" | "output";
}
class BoundaryNode extends Record<BoundaryNodeProps>({
  id: "input",
  edges: List(),
}) {
  public static fromJson(json: BoundaryNodeJson) {
    return new BoundaryNode({
      id: json.id as "input" | "output",
      edges: List(json.edges).map(Edge.fromJson),
    });
  }
}

interface InnerNodeProps extends CommonNodeProps {
  prototype: string;
  label?: string;
  constants: List<string>;
}
class InnerNode extends Record<InnerNodeProps>({
  id: "",
  edges: List(),
  prototype: "",
  constants: List(),
}) {
  public static fromJson(json: InnerNodeJson) {
    return new InnerNode({
      id: json.id,
      edges: List(json.edges).map(Edge.fromJson),
      prototype: json.prototype,
      constants: List(json.constants),
    });
  }
}

type GraphNode = BoundaryNode | InnerNode;

type Graph = Map<string, GraphNode>;

const graphFromJson = (json: GraphJson): Graph =>
  Map(json).map(
    (node: NodeJson) =>
      node.id === "input"
        ? BoundaryNode.fromJson(node)
        : InnerNode.fromJson(node as InnerNodeJson),
  );

const isBoundaryNode = (node: GraphNode | undefined): node is BoundaryNode =>
  !!node && (node.id === "input" || node.id === "output");
const isInnerNode = (node: GraphNode | undefined): node is InnerNode =>
  !!node && !isBoundaryNode(node);

export { EdgeProps, BoundaryNodeProps, InnerNodeProps };
export { PinIndex, Edge, BoundaryNode, InnerNode, GraphNode, Graph };
export { graphFromJson, isBoundaryNode, isInnerNode };
