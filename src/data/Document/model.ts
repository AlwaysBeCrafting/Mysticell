import { List, Record } from "immutable";

import { NamedEntity } from "data/common";

interface DocumentProps extends NamedEntity {
  version: number;
  include: List<string>;
}

class Document extends Record<DocumentProps>({
  id: `document.default`,
  name: "Untitled",
  version: 0,
  include: List(),
}) {}

export { Document };
