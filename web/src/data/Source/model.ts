import { List, Record } from "immutable";

import { Entity, ParamType, TerminalDescription } from "data/common";

type SourceType = "function" | "field" | "table" | "primitive";

/**
 * User-defined behavior for a Node
 */
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
    type: "primitive" as SourceType,
  })
  implements Entity {}

export { Source, SourceType };
