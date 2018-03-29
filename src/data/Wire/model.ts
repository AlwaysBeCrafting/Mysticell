import { Record } from "immutable";

import { Entity, TerminalReference } from "data/common";

interface WireProps extends Entity {
  start: TerminalReference & { sign: "+" };
  end: TerminalReference & { sign: "-" };
}

class Wire extends Record<WireProps>({
  id: "wire.default",
  start: { id: "property.default", sign: "+", index: 0 },
  end: { id: "node.default", sign: "-", index: 0 },
}) {}

export { Wire };
