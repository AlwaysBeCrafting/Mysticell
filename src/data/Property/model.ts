import { List, Record } from "immutable";

import { ValueParam } from "data/common";
import { Formula } from "data/Formula";
import { NodeSourceProps } from "data/NodeSource";

interface PropertyProps extends NodeSourceProps {
  inputValues: List<ValueParam>;
  formula: Formula;
}

class Property extends Record<PropertyProps>({
  id: "property.default",
  name: "Default Property",
  inputPins: "pinGroup.default",
  outputPins: "pinGroup.default",
  inputValues: List.of(""),
  formula: new Formula(),
}) {}

export { Property };
