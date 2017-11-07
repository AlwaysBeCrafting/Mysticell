import { Map, Record, Seq, ValueObject } from "immutable";

import { Tree } from "common/types";
import { hashAll } from "common/utils";

import {
  CardTemplate,
  FunctionCardTemplate,
  GraphCardTemplate,
  isFunction,
  isGraph,
  isPrimitive,
  isProperty,
  isTable,
  PrimitiveCardTemplate,
  PropertyCardTemplate,
  TableCardTemplate,
} from "data/CardTemplate";

import { PaletteJs, TreeGroupJs, TreeJs } from "./js";

class PaletteGroup implements ValueObject {
  readonly type = "group";
  constructor(readonly name: string, readonly expanded: boolean = false) {}

  equals(other: PaletteGroup): boolean {
    return other.type === this.type && other.name === this.name;
  }

  hashCode(): number {
    return hashAll(this.type, this.name);
  }
}
class PaletteItem implements ValueObject {
  readonly type = "item";
  constructor(readonly template: string) {}

  equals(other: PaletteItem): boolean {
    return other.type === this.type && other.template === this.template;
  }

  hashCode(): number {
    return hashAll(this.type, this.template);
  }
}

type TemplateTree = Tree<PaletteGroup | PaletteItem>;
type TemplatePath = Array<PaletteGroup | PaletteItem>;

interface PaletteProps {
  documentTree: TemplateTree;
  primitiveTree: TemplateTree;
  templates: Map<string, CardTemplate>;
}
class Palette extends Record<PaletteProps>({
  documentTree: Tree(),
  primitiveTree: Tree(),
  templates: Map(),
}) {
  static fromJs(js: PaletteJs) {
    return new Palette({
      documentTree: treeFromJs(js.documentTree),
      templates: Map(js.templates).map(CardTemplate.fromJs),
    });
  }

  pathToId(path: string[]): string | undefined {
    let tree = this.documentTree;
    for (const segment of path) {
      const groupIndex = new PaletteGroup(segment);
      if (tree.children.has(groupIndex)) {
        tree = tree.children.get(groupIndex)!;
        continue;
      }
      const item = tree.children.find(
        child =>
          child.value.type === "item" &&
          this.getTemplate(child.value.template)!.name === segment,
      );
      if (item && item.value.type === "item") {
        return item.value.template;
      }
    }
    return undefined;
  }

  getTemplate(templateId: string): CardTemplate | undefined {
    return this.templates.get(templateId);
  }

  getPrimitive(primitiveId: string): PrimitiveCardTemplate | undefined {
    const result = this.templates.get(primitiveId);
    return isPrimitive(result) ? result : undefined;
  }

  getGraph(graphId: string): GraphCardTemplate | undefined {
    const result = this.templates.get(graphId);
    return isGraph(result) ? result : undefined;
  }

  getFunction(functionId: string): FunctionCardTemplate | undefined {
    const result = this.templates.get(functionId);
    return isFunction(result) ? result : undefined;
  }

  getProperty(propertyId: string): PropertyCardTemplate | undefined {
    const result = this.templates.get(propertyId);
    return isProperty(result) ? result : undefined;
  }

  getTable(tableId: string): TableCardTemplate | undefined {
    const result = this.templates.get(tableId);
    return isTable(result) ? result : undefined;
  }
}

function treeFromJs(js: TreeJs): TemplateTree {
  if (js.value.type === "item") {
    return Tree({ value: new PaletteItem(js.value.template) });
  } else {
    const jsGroup = js as TreeGroupJs;
    return Tree({
      value: new PaletteGroup(js.value.name),
      children: Seq.Indexed(jsGroup.children.map(treeFromJs))
        .toKeyedSeq()
        .mapKeys((_, v) => v.value)
        .toMap(),
    });
  }
}

export { PaletteGroup, PaletteItem };
export { Palette, TemplatePath, TemplateTree };
