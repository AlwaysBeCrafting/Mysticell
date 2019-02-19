import { Record } from "immutable";

import { Entity, TerminalReference } from "data/common";

/**
 * A connection between the Terminals of two Nodes, or
 * During calculation, these define explicit edges in the graph
 */
class Wire
  extends Record({
    id: "wire.default",
    start: new TerminalReference("property.default", "+", 0),
    end: new TerminalReference("node.default", "-", 0),
  })
  implements Entity {}

export { Wire };
