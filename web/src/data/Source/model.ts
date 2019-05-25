import { List, Record } from "immutable";

import { Entity, ParamType, Terminal } from "~/data/common";

type SourceType = "function" | "field" | "table" | "primitive";

/**
 * User-defined behavior for a Node
 */
class Source
  extends Record({
    id: "source.default",
    documentId: "document.default",
    path: "/Default Source",
    inputs: List.of<Terminal>({
      name: "Input",
      type: "undefined" as ParamType,
    }),
    outputs: List.of<Terminal>({
      name: "Output",
      type: "undefined" as ParamType,
    }),
    type: "primitive" as SourceType,
  })
  implements Entity {}

export { Source, SourceType };
