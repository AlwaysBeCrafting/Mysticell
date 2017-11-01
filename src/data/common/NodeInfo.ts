import { Map } from "immutable";

import { Position2d } from "common/types";

import { PRIMITIVES } from "data/common";
import { InnerNode } from "data/Graph";
import {
  GraphNodePrototype,
  isProperty,
  NodePrototype,
} from "data/NodePrototype";

interface InputInfo {
  name: string;
  value: string;
  isConnected: boolean;
  canConnect: boolean;
}

interface OutputInfo {
  name: string;
}

interface NodeInfo {
  id: string;
  label: string;
  parentId: string;
  inputs: InputInfo[];
  outputs: OutputInfo[];
  position: { x: number; y: number };
}
const nodeInfoFromNode = (
  nodePrototypes: Map<string, NodePrototype>,
  parentGraph: GraphNodePrototype,
  node: InnerNode,
): NodeInfo => {
  const prototype =
    nodePrototypes.get(node.prototype) || PRIMITIVES[node.prototype];
  return {
    id: node.id,
    label: node.label || prototype.name,
    parentId: parentGraph.id,
    inputs: prototype.inputNames
      .map((name, index) => {
        const isConnected = parentGraph.graph.some(sibling =>
          sibling.edges.some(
            edge => edge.target === node.id && edge.index.dst === index,
          ),
        );
        return {
          name,
          value: node.constants.get(index, ""),
          isConnected,
          canConnect: !isProperty(prototype),
        };
      })
      .toArray(),
    outputs: prototype.outputNames.map(name => ({ name })).toArray(),
    position: (parentGraph.layout.get(node.id) || new Position2d()).toJS(),
  };
};

const nodeInfoFromPrototype = (prototype: NodePrototype): NodeInfo => {
  return {
    id: "node.drag",
    label: prototype.name,
    parentId: prototype.id,
    inputs: prototype.inputNames
      .map((inputName, index) => ({
        name: inputName,
        value: isProperty(prototype)
          ? prototype.inputValues.get(index) || ""
          : "",
        canConnect: !isProperty(prototype),
        isConnected: false,
      }))
      .toArray(),
    outputs: prototype.outputNames
      .map(outputName => ({ name: outputName }))
      .toArray(),
    position: { x: 0, y: 0 },
  };
};

export { NodeInfo, nodeInfoFromNode, nodeInfoFromPrototype };
