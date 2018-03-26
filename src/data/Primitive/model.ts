import { List, Record } from "immutable";

import { NodeSource, ParamFunction } from "data/common";
import { PinGroup } from "../PinGroup/model";

interface PrimitiveProps extends NodeSource {
  evaluate: ParamFunction;
}

class Primitive extends Record<PrimitiveProps>({
  id: "primitive.default",
  name: "Default Primitive",
  inputPins: List.of({ name: "Input", type: "undefined" }) as PinGroup,
  outputPins: List.of({ name: "Output", type: "undefined" }) as PinGroup,
  evaluate: inputs => inputs,
}) {}

export { Primitive };
