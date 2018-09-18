import { List, Record } from "immutable";

import { Position2d } from "common/types";

import { Entity } from "data/common";

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
