import { Dict } from "common/types";

import { PaletteJs } from "data/Palette";
import { SheetJs } from "data/Sheet";

interface DocumentJs {
  id: string;
  title: string;
  version: number;
  include: string[];

  sheets: Dict<SheetJs>;
  palette: PaletteJs;
}

export { DocumentJs };
