import { Graph } from "filament";
import { Map, Record } from "immutable";

import { Node } from "data/Node";

interface FormulaProps {
  id: string;
  nodes: Map<string, Node>;
  graph: Graph<string>;
}

class Formula extends Record<FormulaProps>({
  id: "formula.default",
  nodes: Map(),
  graph: Graph(),
}) {}

export { Formula };
