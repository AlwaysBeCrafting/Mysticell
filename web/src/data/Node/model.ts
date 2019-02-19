import { List, Record } from "immutable";

import { Position2d } from "common/types";

import { Entity } from "data/common";

/**
 * Element of a formula that can be connected to its inputs/outputs or other nodes.
 * Doesn't map 1:1 with actual graph nodes, as multiple source and target terminals
 * may exist on a single user-facing "Node".
 */
class Node
  extends Record({
    id: "node.default",
    source: "primitive.noop",
    label: undefined as string | undefined,
    values: List.of(""),
    position: new Position2d(),
  })
  implements Entity {}

export { Node };
