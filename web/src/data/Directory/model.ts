import { Record } from "immutable";

import { Entity } from "data/common";

interface DirectoryProps extends Entity {
  name: string;
  isExpanded: boolean;
}

class Directory extends Record<DirectoryProps>({
  id: "directory.root",
  name: "",
  isExpanded: false,
}) {}

export { Directory };
