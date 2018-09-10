import { Record } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable, Relation } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

class App extends Record({
  cells: new EntityTable<Cell>(),
  cellSheets: new Relation.HasOne(),
  cellDocuments: new Relation.HasOne(),

  directories: new EntityTable<Directory>(),
  directoryParents: new Relation.HasOne(),
  directoryChildren: new Relation.HasMany(),
  directoryDocuments: new Relation.HasOne(),

  documents: new EntityTable<Document>(),
  documentCells: new Relation.HasMany(),
  documentDirectories: new Relation.HasMany(),
  documentNodes: new Relation.HasMany(),
  documentSheets: new Relation.HasMany(),
  documentSources: new Relation.HasMany(),
  documentWires: new Relation.HasMany(),

  nodes: new EntityTable<Node>(),
  nodeDocuments: new Relation.HasOne(),
  nodeFormulas: new Relation.HasOne(),
  nodeSources: new Relation.HasOne(),

  sheets: new EntityTable<Sheet>(),
  sheetCells: new Relation.HasMany(),
  sheetDocuments: new Relation.HasOne(),

  sources: new EntityTable<Source>(),
  formulaNodes: new Relation.HasMany(),
  formulaWires: new Relation.HasMany(),

  wires: new EntityTable<Wire>(),
  wireNodes: new Relation.HasMany(),
  wireFormulas: new Relation.HasOne(),
}) {}

export { App };
