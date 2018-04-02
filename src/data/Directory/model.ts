import { Record } from "immutable";

import { NamedEntity } from "data/common";

interface DirectoryProps extends NamedEntity {
  isExpanded: boolean;
}

class Directory extends Record<DirectoryProps>({
  id: "directory.root",
  name: "",
  isExpanded: false,
}) {}

export { Directory };
