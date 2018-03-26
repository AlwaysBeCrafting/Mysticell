import { PinGroup } from "data/PinGroup";

import { NamedEntity } from "./Entity";

interface NodeSource extends NamedEntity {
  readonly inputPins: PinGroup;
  readonly outputPins: PinGroup;
}

export { NodeSource };
