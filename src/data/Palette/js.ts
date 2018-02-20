import { Dict } from "common/types";

import { CardTemplateJs } from "data/CardTemplate";

interface TreeGroupJs {
  value: { type: "group"; name: string };
  children: TreeJs[];
}
interface TreeItemJs {
  value: { type: "item"; template: string };
}
type TreeJs = TreeGroupJs | TreeItemJs;

interface PaletteJs {
  documentTree: TreeJs;
  templates: Dict<CardTemplateJs>;
}

export { PaletteJs, TreeJs, TreeGroupJs, TreeItemJs };
