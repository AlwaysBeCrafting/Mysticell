import { Record } from "immutable";

import { NamedEntity } from "data/common";

interface DirectoryProps extends NamedEntity {}

class Directory extends Record<DirectoryProps>({
  id: "directory.root",
  name: "",
}) {}

export { Directory };
