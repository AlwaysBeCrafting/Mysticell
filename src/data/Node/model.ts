import { List, Record } from "immutable";

import { Position2d } from "common/types";

interface NodeProps {
  id: string;
  source: string;
  label?: string;
  values: List<string>;
  position: Position2d;
}

class Node extends Record<NodeProps>({
  id: "node.default",
  source: "primitive.noop",
  values: List.of(""),
  position: new Position2d(),
}) {}

export { Node };
