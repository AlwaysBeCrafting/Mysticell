import { exampleDoc } from "common/assets/exampleDoc";

const sheet = exampleDoc.sheets["sheet.0000"];
const cell = sheet.cells["cell.0000"];
const funcNodePrototype = exampleDoc.nodePrototypes["function.0000"];
const propNodePrototype = exampleDoc.nodePrototypes["property.0001"];
const innerNode = propNodePrototype.graph["node.0003"];
const edge = innerNode.edges[0];

type DocumentJson = typeof exampleDoc;
type SheetJson = typeof sheet;
type SheetLayoutJson = typeof sheet.layout;
type CellJson = typeof cell;
type CellPropertyJson = typeof cell.property;
type FunctionNodePrototypeJson = typeof funcNodePrototype;
type PropertyNodePrototypeJson = typeof propNodePrototype;
type NodePrototypeJson = FunctionNodePrototypeJson | PropertyNodePrototypeJson;
type GraphJson =
  | typeof propNodePrototype.graph
  | typeof funcNodePrototype.graph;
type BoundaryNodeJson = typeof propNodePrototype.graph.input;
type InnerNodeJson = typeof innerNode;
type NodeJson = BoundaryNodeJson | InnerNodeJson;
type EdgeJson = typeof edge;
type PinIndexJson = typeof edge.pinIndex;
type NavJson = typeof exampleDoc.nav;

export {
  DocumentJson,
  SheetJson,
  SheetLayoutJson,
  CellJson,
  CellPropertyJson,
  FunctionNodePrototypeJson,
  PropertyNodePrototypeJson,
  NodePrototypeJson,
  GraphJson,
  BoundaryNodeJson,
  InnerNodeJson,
  NodeJson,
  EdgeJson,
  PinIndexJson,
  NavJson,
};
