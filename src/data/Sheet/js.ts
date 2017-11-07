import { Dict } from "common/types";

import { CellJs } from "data/Cell";

interface SheetJs {
  id: string;
  title: string;
  size: { width: number; height: number };
  cells: Dict<CellJs>;
}

export { SheetJs };
