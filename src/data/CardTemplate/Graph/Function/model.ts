import { List, Map, Record } from "immutable";

import { Graph, Position2d } from "common/types";

import { Card } from "data/Card";
import { CardTemplate } from "data/CardTemplate";
import { Palette } from "data/Palette";

import { GraphCardTemplateMethods, GraphCardTemplateProps } from "../model";

import { FunctionCardTemplateJs } from "./js";

class FunctionCardTemplate extends Record<GraphCardTemplateProps>({
  id: "template.function.base",
  name: "Function",
  inputNames: List(),
  outputNames: List(),
  cards: Map(),
  graph: Graph(),
}) implements GraphCardTemplateMethods {
  static fromJs(js: FunctionCardTemplateJs) {
    return new FunctionCardTemplate({
      id: js.id,
      name: js.name,
      inputNames: List(js.inputNames),
      outputNames: List(js.outputNames),
      cards: Map(js.cards).map(Card.fromJs),
      graph: Graph(),
    });
  }

  nodePosition(nodeId: string, palette: Palette): Position2d {
    const node = this.graph.nodes.get(nodeId)!;
    if (node.type === "card") {
      const card = this.cards.get(node.card)!;
      const template = palette.getTemplate(card.template);
      if (node.side === "input") {
        const outputCount = template ? template.outputNames.size : 0;
        return new Position2d(
          card.position.x,
          card.position.y + outputCount + node.index + 1 + 0.5,
        );
      } else {
        return new Position2d(
          card.position.x + 4,
          card.position.y + node.index + 1 + 0.5,
        );
      }
    } else {
      return new Position2d(this.gridWidth(), 0.5 + 2);
    }
  }

  gridWidth(): number {
    return this.cards.map(card => card.position.x).max()! + 4 + 2;
  }
}

const isFunction = (
  template: CardTemplate | undefined,
): template is FunctionCardTemplate =>
  !!template && template.id.startsWith("template.function");

export { FunctionCardTemplate, isFunction };
