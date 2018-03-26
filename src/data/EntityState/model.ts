import { List, Map, Record } from "immutable";

import { Cell } from "data/Cell";
import { Directory } from "data/Directory";
import { Formula } from "data/Formula";
import { Func } from "data/Func";
import { Node } from "data/Node";
import { Property } from "data/Property";
import { Sheet } from "data/Sheet";
import { Table } from "data/Table";

type IdMap<T> = Map<string, T>;

interface EntityStateProps {
  cells: IdMap<Cell>;
  directories: IdMap<Directory>;
  formulas: IdMap<Formula>;
  funcs: IdMap<Func>;
  nodes: IdMap<Node>;
  properties: IdMap<Property>;
  sheets: IdMap<Sheet>;
  tables: IdMap<Table>;

  parents: Map<string, string>;
  children: Map<string, List<string>>;
}

class EntityState extends Record<EntityStateProps>({
  cells: Map(),
  directories: Map(),
  formulas: Map(),
  funcs: Map(),
  nodes: Map(),
  properties: Map(),
  sheets: Map(),
  tables: Map(),

  parents: Map(),
  children: Map(),
}) {}

export { EntityState };
