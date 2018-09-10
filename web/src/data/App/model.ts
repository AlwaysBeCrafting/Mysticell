import { Record } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Node } from "data/Node";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

class App extends Record({
  documents: new EntityTable<Document>(),

  sheets: new EntityTable<Sheet>(),
  cells: new EntityTable<Cell>(),

  directories: new EntityTable<Directory>(),
  sources: new EntityTable<Source>(),

  nodes: new EntityTable<Node>(),
  wires: new EntityTable<Wire>(),
}) {}

export { App };
