import { List, Record } from "immutable";

import { ParamFunction, ParamType } from "data/common";
import { NodeSourceProps } from "data/NodeSource";

interface PrimitiveProps extends NodeSourceProps {
  evaluate: ParamFunction;
}

class Primitive extends Record<PrimitiveProps>({
  id: "primitive.default",
  name: "Default Primitive",
  inputNames: List.of("Input"),
  inputTypes: List.of("undefined") as List<ParamType>,
  outputNames: List.of("Output"),
  evaluate: inputs => inputs,
}) {}

export { Primitive };
