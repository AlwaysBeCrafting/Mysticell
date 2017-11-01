import { List, Map, Record } from "immutable";

import {
  DocumentJson,
  FunctionNodePrototypeJson,
  PropertyNodePrototypeJson,
} from "data/json";
import { Nav } from "data/Nav";
import {
  FunctionNodePrototype,
  NodePrototype,
  PropertyNodePrototype,
} from "data/NodePrototype";
import { Sheet } from "data/Sheet";

interface DocumentProps {
  id: string;
  title: string;
  version: number;
  include: List<string>;

  sheets: Map<string, Sheet>;
  nodePrototypes: Map<string, NodePrototype>;

  nav: Nav;
}

class Document extends Record<DocumentProps>({
  id: `document.00000000`,
  title: "Untitled",
  version: 0,
  include: List(),

  sheets: Map(),
  nodePrototypes: Map(),

  nav: { value: "root" },
}) {
  public static fromJson(json: DocumentJson): Document {
    const { id, title, version, include, sheets, nodePrototypes, nav } = json;
    return new Document({
      id,
      title,
      version,
      include: List(include),

      sheets: Map(sheets).map(Sheet.fromJson),
      nodePrototypes: Map(nodePrototypes).map(jsonPrototype => {
        switch (jsonPrototype.id.split(".")[0]) {
          case "function": {
            return FunctionNodePrototype.fromJson(
              jsonPrototype as FunctionNodePrototypeJson,
            );
          }
          case "property": {
            return PropertyNodePrototype.fromJson(
              jsonPrototype as PropertyNodePrototypeJson,
            );
          }
          default: {
            throw new Error(
              `Could not deserialize node prototype ${jsonPrototype.id}`,
            );
          }
        }
      }),

      nav,
    });
  }
}

export { Document };
