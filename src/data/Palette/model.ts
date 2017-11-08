import { List, Map, Record, Seq, ValueObject } from "immutable";

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
  PRIMITIVES,
  PropertyCardTemplate,
  TableCardTemplate,
} from "data/CardTemplate";

import { PaletteJs, TreeGroupJs, TreeJs } from "./js";

class PaletteGroup implements ValueObject {
  readonly type = "group";
  constructor(readonly name: string, readonly isExpanded: boolean = true) {}

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

type PaletteNode = PaletteGroup | PaletteItem;
type TemplateTree = Tree<string, PaletteNode>;
type TemplatePath = List<string>;

interface PaletteProps {
  documentTree: TemplateTree;
  primitiveTree: TemplateTree;
  templates: Map<string, CardTemplate>;
}
class Palette extends Record<PaletteProps>({
  documentTree: Tree(),
  primitiveTree: Tree(),
  templates: PRIMITIVES,
}) {
  static fromJs(js: PaletteJs) {
    return new Palette({
      documentTree: treeFromJs(js.documentTree),
    }).mergeIn(["templates"], Map(js.templates).map(CardTemplate.fromJs));
  }

  idFromPath(path: string[]): string | undefined {
    let tree = this.documentTree;
    for (const segment of path) {
      if (tree.children.has(segment)) {
        tree = tree.children.get(segment)!;
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
  }
  if (js.value.type === "group") {
    const jsGroup = js as TreeGroupJs;
    return Tree({
      value: new PaletteGroup(jsGroup.value.name),
      children: Seq.Indexed(jsGroup.children)
        .toKeyedSeq()
        .map(treeFromJs)
        .mapKeys(
          (_, v) =>
            v.value.type === "group" ? v.value.name : v.value.template,
        )
        .toMap(),
    });
  }
  throw new Error(`Unexpected value ${js} when deserializing template tree`);
}

function stringFromPath(path: TemplatePath): string {
  return path.join("\n");
}

export { PaletteGroup, PaletteItem, PaletteNode };
export { Palette, TemplatePath, TemplateTree };
export { stringFromPath };
