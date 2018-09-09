import { Map, Record } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

interface AppStateProps {
  documents: EntityTable<Document>;

  sheets: EntityTable<Sheet>;
  cells: EntityTable<Cell>;

  directories: EntityTable<Directory>;
  sources: EntityTable<Source>;

  nodes: EntityTable<Node>;
  wires: EntityTable<Wire>;
}

class App extends Record<AppStateProps>({
  documents: Map(),

  sheets: Map(),
  cells: Map(),

  directories: Map(),
  sources: Map(),

  nodes: Map(),
  wires: Map(),
}) {}

export { App };
