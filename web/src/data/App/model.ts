import { List, Map, Record } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable } from "data/common";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

const Index = Map<string, List<string>>();

/**
 * Contains normalized maps of core data types and their relationships
 */
class App extends Record({
  cells: new EntityTable<Cell>(),

  documents: new EntityTable<Document>(),
  documentSheets: Index,
  documentSources: Index,

  nodes: new EntityTable<Node>(),
  nodeSources: Index,

  sheets: new EntityTable<Sheet>(),
  sheetCells: Index,

  sources: new EntityTable<Source>(),
  formulaNodes: Index,
  formulaWires: Index,

  wires: new EntityTable<Wire>(),
  wireNodes: Index,
}) {}

export { App };
