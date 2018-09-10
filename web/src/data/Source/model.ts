import { List, Record } from "immutable";

import { Entity, ParamType, TerminalDescription } from "data/common";

type SourceType = "function" | "property" | "table" | "primitive";

class Source
  extends Record({
    id: "source.default",
    name: "Default source",
    inputs: List.of<TerminalDescription>({
      name: "Input",
      type: "undefined" as ParamType,
    }),
    outputs: List.of<TerminalDescription>({
      name: "Output",
      type: "undefined" as ParamType,
    }),
    type: "primitive",
  })
  implements Entity {}

export { Source, SourceType };
