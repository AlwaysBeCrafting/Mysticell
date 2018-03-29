import { Pin, PinIndex } from "data/Pin";

import { NamedEntity } from "./Entity";

interface NodeSource extends NamedEntity {
  readonly inputPins: PinGroup;
  readonly outputPins: PinGroup;
}

export { NodeSource };
