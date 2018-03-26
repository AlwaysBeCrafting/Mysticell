import { Graph } from "filament";
import { Map, Record } from "immutable";

import { Entity } from "data/common";
import { Node } from "data/Node";

interface FormulaProps extends Entity {
  nodes: Map<string, Node>;
  graph: Graph<string>;
}

class Formula extends Record<FormulaProps>({
  id: "formula.default",
  nodes: Map(),
  graph: Graph(),
}) {}

export { Formula };
