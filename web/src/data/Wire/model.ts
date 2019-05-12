import { Record } from "immutable";

import { Entity, TerminalPointer } from "~/data/common";

/**
 * A connection between terminals
 * During calculation, these define explicit edges in the graph
 */
class Wire
  extends Record({
    id: "wire.default",
    tail: new TerminalPointer("node.default", 0),
    head: new TerminalPointer("node.default", 0),
  })
  implements Entity {}

export { Wire };
