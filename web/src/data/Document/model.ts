import { List, Record } from "immutable";

import { Entity } from "~/data/common";

/**
 * Collection of all sources and sheets that can be referenced at one time
 */
class Document
  extends Record({
    id: `document.default`,
    name: "Untitled",
    version: 0,
    include: List<string>(),
  })
  implements Entity {}

export { Document };
