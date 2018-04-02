import { List, Map, Record } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable, JoinManyToOne, TerminalReference } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { Row } from "data/Row";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

interface Entities {
  documents: EntityTable<Document>;

  sheets: EntityTable<Sheet>;
  cells: EntityTable<Cell>;

  directories: EntityTable<Directory>;
  sources: EntityTable<Source>;

  nodes: EntityTable<Node>;
  wires: EntityTable<Wire>;

  rows: EntityTable<Row>;
}

interface Relationships {
  sheetDocuments: JoinManyToOne;
  directoryDocuments: JoinManyToOne;
  sourceDocuments: JoinManyToOne;

  cellSheets: JoinManyToOne;

  entityParents: JoinManyToOne;

  nodeSources: JoinManyToOne;
  wireSources: JoinManyToOne;
}

interface Data {
  propertyValues: Map<TerminalReference, string>;
}

class EntityState extends Record<Entities & Relationships & Data>({
  // Entities
  documents: Map(),

  sheets: Map(),
  cells: Map(),

  directories: Map(),
  sources: Map(),

  nodes: Map(),
  wires: Map(),

  rows: Map(),

  // Relationships
  sheetDocuments: Map(),
  directoryDocuments: Map(),
  sourceDocuments: Map(),

  cellSheets: Map(),
  entityParents: Map(),

  nodeSources: Map(),
  wireSources: Map(),

  // Data
  propertyValues: Map(),
}) {}

export { EntityState };
