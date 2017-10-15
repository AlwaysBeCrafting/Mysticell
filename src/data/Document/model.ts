import { Dict } from "common/types";

import { Nav } from "data/Nav";
import { NodePrototype } from "data/NodePrototype";
import { Sheet } from "data/Sheet";

interface Document {
  id: string;
  title: string;
  version: number;
  include: string[];

  sheets: Dict<Sheet>;
  nodePrototypes: Dict<NodePrototype>;

  nav: Nav;
}

export { Document };
