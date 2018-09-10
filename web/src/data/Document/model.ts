import { List, Record } from "immutable";

import { Entity } from "data/common";

class Document
  extends Record({
    id: `document.default`,
    name: "Untitled",
    version: 0,
    include: List<string>(),
  })
  implements Entity {}

export { Document };
