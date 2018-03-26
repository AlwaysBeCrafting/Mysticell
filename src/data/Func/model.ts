import { List, Record } from "immutable";

import { NodeSource } from "data/common";
import { Formula } from "data/Formula";

interface FuncProps extends NodeSource {
  formula: Formula;
}

class Func extends Record<FuncProps>({
  id: "func.default",
  name: "Default Function",
  inputPins: List.of({ name: "Input", type: "undefined" as "undefined" }),
  outputPins: List.of({ name: "Output", type: "undefined" as "undefined" }),
  formula: new Formula(),
}) {}

export { Func };
