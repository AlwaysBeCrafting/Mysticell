import { List, Record } from "immutable";

import { Entity } from "data/common";

interface DocumentProps extends Entity {
  name: string;
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
