import { List, Record } from "immutable";

import { Entity, ParamType, TerminalDescription } from "data/common";

type SourceType = "function" | "property" | "table" | "primitive";

interface SourceProps extends Entity {
  name: string;
  inputs: List<TerminalDescription>;
  outputs: List<TerminalDescription>;
  type: SourceType;
}

class Source extends Record<SourceProps>({
  id: "source.default",
  name: "Default source",
  inputs: List.of({ name: "Input", type: "undefined" as ParamType }),
  outputs: List.of({ name: "Output", type: "undefined" as ParamType }),
  type: "primitive",
}) {}

export { Source, SourceType };
