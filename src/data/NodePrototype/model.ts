import { Dict, Position2d } from "common/types";

import { ParamFunction } from "data/common";
import { Graph } from "data/Graph";

interface NodePrototype {
  id: string;
  name: string;
  inputNames: string[];
  outputNames: string[];
}
interface PrimitiveNodePrototype extends NodePrototype {
  evaluate: ParamFunction;
}
interface GraphNodePrototype extends NodePrototype {
  layout: Dict<Position2d>;
  graph: Graph;
}
interface FunctionNodePrototype extends GraphNodePrototype {}
interface PropertyNodePrototype extends GraphNodePrototype {
  inputNames: never[];
  inputValues: string[];
}
interface TableNodePrototype extends NodePrototype {
  inputs: ["Row"];
  rows: any[];
}

const isPrimitive = (
  prototype: NodePrototype,
): prototype is PrimitiveNodePrototype => prototype.id.startsWith("primitive");
const isGraph = (prototype: NodePrototype): prototype is GraphNodePrototype =>
  isFunction(prototype) || isProperty(prototype);
const isFunction = (
  prototype: NodePrototype,
): prototype is FunctionNodePrototype => prototype.id.startsWith("function");
const isProperty = (
  prototype: NodePrototype,
): prototype is PropertyNodePrototype => prototype.id.startsWith("property");
const isTable = (prototype: NodePrototype): prototype is TableNodePrototype =>
  prototype.id.startsWith("table");

export {
  NodePrototype,
  PrimitiveNodePrototype,
  GraphNodePrototype,
  FunctionNodePrototype,
  PropertyNodePrototype,
  TableNodePrototype,
};
export { isPrimitive, isGraph, isFunction, isProperty, isTable };
