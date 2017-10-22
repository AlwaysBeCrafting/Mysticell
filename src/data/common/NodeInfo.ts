import { Dict } from "common/types";

import { PRIMITIVES } from "data/common";
import { InnerNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

interface InputInfo {
  readonly name: string;
  readonly value: string;
  readonly isConnected: boolean;
}

interface OutputInfo {
  readonly name: string;
}

interface NodeInfo {
  readonly id: string;
  readonly label: string;
  readonly parentId: string;
  readonly inputs: InputInfo[];
  readonly outputs: OutputInfo[];
}

const getNodeInfo = (
  nodePrototypes: Dict<NodePrototype>,
  parentGraph: GraphNodePrototype,
  node: InnerNode,
): NodeInfo => {
  const prototype =
    nodePrototypes[node.prototype] || PRIMITIVES[node.prototype];
  return {
    id: node.id,
    label: node.label || prototype.name,
    parentId: parentGraph.id,
    inputs: prototype.inputNames.map((name, index) => {
      let isConnected = false;
      outer: for (const sibling of Object.values(parentGraph.graph)) {
        for (const edge of sibling.edges) {
          if (edge.target === node.id && edge.data[1] === index) {
            isConnected = true;
            break outer;
          }
        }
      }
      return { name, value: node.constants[index], isConnected };
    }),
    outputs: prototype.outputNames.map(name => ({ name })),
  };
};

export { NodeInfo, getNodeInfo };
