import { List, Map, Record } from "immutable";

import { Graph } from "common/types";

import { Card } from "data/Card";
import { CardTemplate } from "data/CardTemplate";

import {
  GraphCardTemplateMethods,
  GraphCardTemplateProps,
  nodePosition,
} from "../model";

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

  nodePosition = nodePosition;

  gridWidth(): number {
    return this.cards.map(card => card.position.x).max()! + 4 + 2;
  }
}

const isFunction = (
  template: CardTemplate | undefined,
): template is FunctionCardTemplate =>
  !!template && template.id.startsWith("template.function");

export { FunctionCardTemplate, isFunction };
