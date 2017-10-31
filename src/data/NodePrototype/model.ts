import { List, Map, Record } from "immutable";

import { Position2d } from "common/types";

import { ParamFunction } from "data/common";
import { Graph, graphFromJson } from "data/Graph";
import {
  FunctionNodePrototypeJson,
  PropertyNodePrototypeJson,
} from "data/json";

interface NodePrototypeProps {
  id: string;
  name: string;
  inputNames: List<string>;
  outputNames: List<string>;
}

interface PrimitiveNodePrototypeProps extends NodePrototypeProps {
  evaluate: ParamFunction;
}
class PrimitiveNodePrototype extends Record<PrimitiveNodePrototypeProps>({
  id: "primitive.00000000",
  name: "Primitive",
  inputNames: List(),
  outputNames: List(),
  evaluate: () => List(),
}) {}

interface GraphNodePrototypeProps extends NodePrototypeProps {
  layout: Map<string, Position2d>;
  graph: Graph;
}
class FunctionNodePrototype extends Record<GraphNodePrototypeProps>({
  id: "graph.00000000",
  name: "Graph",
  inputNames: List(),
  outputNames: List(),
  layout: Map(),
  graph: Map(),
}) {
  public static fromJson(json: FunctionNodePrototypeJson) {
    return new FunctionNodePrototype({
      id: json.id,
      name: json.name,
      inputNames: List(json.inputNames),
      outputNames: List(json.outputNames),
      layout: Map(json.layout).map(Position2d.fromJson),
      graph: graphFromJson(json.graph),
    });
  }
}

interface PropertyNodePrototypeProps extends GraphNodePrototypeProps {
  inputValues: List<string>;
}
class PropertyNodePrototype extends Record<PropertyNodePrototypeProps>({
  id: "property.00000000",
  name: "Property",
  inputNames: List(),
  inputValues: List(),
  outputNames: List(),
  layout: Map(),
  graph: Map(),
}) {
  public static fromJson(json: PropertyNodePrototypeJson) {
    return new PropertyNodePrototype({
      id: json.id,
      name: json.name,
      inputNames: List(json.inputNames),
      inputValues: List(json.inputValues),
      outputNames: List(json.outputNames),
      layout: Map(json.layout).map(Position2d.fromJson),
      graph: graphFromJson(json.graph),
    });
  }
}

type GraphNodePrototype = FunctionNodePrototype | PropertyNodePrototype;

interface TableNodePrototypeProps extends NodePrototypeProps {
  rows: List<any>;
}
class TableNodePrototype extends Record<TableNodePrototypeProps>({
  id: "table.00000000",
  name: "Table",
  inputNames: List(["Row"]),
  outputNames: List(),
  rows: List(),
}) {
  public static fromJson(json: any) {
    return new TableNodePrototype({
      id: json.id,
      name: json.name,
      outputNames: List(json.outputNames),
      rows: List(json.rows),
    });
  }
}

type NodePrototype =
  | PrimitiveNodePrototype
  | GraphNodePrototype
  | FunctionNodePrototype
  | PropertyNodePrototype
  | TableNodePrototype;

const isPrimitive = (
  prototype: NodePrototype | undefined,
): prototype is PrimitiveNodePrototype =>
  !!prototype && prototype.id.startsWith("primitive");
const isGraph = (
  prototype: NodePrototype | undefined,
): prototype is GraphNodePrototype =>
  !!prototype &&
  (prototype.id.startsWith("function") || prototype.id.startsWith("property"));
const isProperty = (
  prototype: NodePrototype | undefined,
): prototype is PropertyNodePrototype =>
  !!prototype && prototype.id.startsWith("property");
const isTable = (
  prototype: NodePrototype | undefined,
): prototype is TableNodePrototype =>
  !!prototype && prototype.id.startsWith("table");

const getPrimitive = (
  nodePrototypes: Map<string, NodePrototype>,
  id: string,
): PrimitiveNodePrototype | undefined => {
  const result = nodePrototypes.get(id);
  return isPrimitive(result) ? result : undefined;
};
const getGraph = (
  nodePrototypes: Map<string, NodePrototype>,
  id: string,
): GraphNodePrototype | undefined => {
  const result = nodePrototypes.get(id);
  return isGraph(result) ? result : undefined;
};
const getProperty = (
  nodePrototypes: Map<string, NodePrototype>,
  id: string,
): PropertyNodePrototype | undefined => {
  const result = nodePrototypes.get(id);
  return isProperty(result) ? result : undefined;
};
const getTable = (
  nodePrototypes: Map<string, NodePrototype>,
  id: string,
): TableNodePrototype | undefined => {
  const result = nodePrototypes.get(id);
  return isTable(result) ? result : undefined;
};

export {
  NodePrototype,
  PrimitiveNodePrototype,
  GraphNodePrototype,
  FunctionNodePrototype,
  PropertyNodePrototype,
  TableNodePrototype,
};
export { isPrimitive, isGraph, isProperty, isTable };
export { getPrimitive, getGraph, getProperty, getTable };
