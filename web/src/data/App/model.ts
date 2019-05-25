import { List, Map, Record } from "immutable";

import { Cell } from "~/data/Cell";
import { EntityTable } from "~/data/common";
import { Document } from "~/data/Document";
import { Node } from "~/data/Node";
import { Sheet } from "~/data/Sheet";
import { Source } from "~/data/Source";
import { Wire } from "~/data/Wire";

const EmptyIndex = Map<string, List<string>>();

/**
 * Contains normalized maps of core data types and their relationships
 */
class App extends Record({
  cells: new EntityTable<Cell>(),

  documents: new EntityTable<Document>(),
  documentSheets: EmptyIndex,
  documentSources: EmptyIndex,

  nodes: new EntityTable<Node>(),
  nodeSources: EmptyIndex,

  sheets: new EntityTable<Sheet>(),
  sheetCells: EmptyIndex,

  sources: new EntityTable<Source>(),
  formulaNodes: EmptyIndex,
  formulaWires: EmptyIndex,

  wires: new EntityTable<Wire>(),
  wireNodes: EmptyIndex,
}) {}

export { App };
