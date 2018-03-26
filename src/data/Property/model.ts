import { List, Record } from "immutable";

import { NodeSource, ValueParam } from "data/common";
import { Formula } from "data/Formula";

interface PropertyProps extends NodeSource {
  inputValues: List<ValueParam>;
  formula: Formula;
}

class Property extends Record<PropertyProps>({
  id: "property.default",
  name: "Default Property",
  inputPins: List(),
  outputPins: List(),
  inputValues: List.of(""),
  formula: new Formula(),
}) {}

export { Property };
