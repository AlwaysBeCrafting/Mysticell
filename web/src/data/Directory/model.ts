import { Record } from "immutable";

import { Entity } from "data/common";

/**
 * Container for sources or other directories
 */
class Directory
  extends Record({
    id: "directory.root",
    name: "",
    isExpanded: false,
  })
  implements Entity {}

export { Directory };
