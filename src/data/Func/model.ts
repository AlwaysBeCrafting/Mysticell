import { List, Record } from "immutable";

import { ParamType } from "data/common";
import { Formula } from "data/Formula";
import { NodeSourceProps } from "data/NodeSource";

interface FuncProps extends NodeSourceProps {
  formula: Formula;
}

class Func extends Record<FuncProps>({
  id: "func.default",
  name: "Default Function",
  inputNames: List.of("Input"),
  inputTypes: List.of("undefined") as List<ParamType>,
  outputNames: List.of("Output"),
  formula: new Formula(),
}) {}

export { Func };
