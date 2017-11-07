import { List, Map, Record } from "immutable";

import { Palette } from "data/Palette";
import { Sheet } from "data/Sheet";

import { DocumentJs } from "./js";

interface DocumentProps {
  id: string;
  title: string;
  version: number;
  include: List<string>;

  sheets: Map<string, Sheet>;
  palette: Palette;
}

class Document extends Record<DocumentProps>({
  id: `document.00000000`,
  title: "Untitled",
  version: 0,
  include: List(),

  sheets: Map(),
  palette: new Palette(),
}) {
  static fromJs(js: DocumentJs): Document {
    const { id, title, version, include, sheets, palette } = js;
    return new Document({
      id,
      title,
      version,
      include: List(include),

      sheets: Map(sheets).map(Sheet.fromJs),
      palette: Palette.fromJs(palette),
    });
  }
}

export { Document };
