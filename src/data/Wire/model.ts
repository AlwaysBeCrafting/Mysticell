import { Record } from "immutable";

import { Entity, TerminalReference } from "data/common";

interface WireProps extends Entity {
  start: TerminalReference<"+">;
  end: TerminalReference<"-">;
}

class Wire extends Record<WireProps>({
  id: "wire.default",
  start: new TerminalReference("property.default", "+", 0),
  end: new TerminalReference("node.default", "-", 0),
}) {}

export { Wire };
