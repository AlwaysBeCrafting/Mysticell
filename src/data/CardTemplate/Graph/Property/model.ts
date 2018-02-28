import { Graph } from "filament";
import { List, Map, Record } from "immutable";

import { Card } from "data/Card";
import { CardTemplate } from "data/CardTemplate";
import { Param } from "data/common";

import { GraphCardTemplateProps } from "../model";

import { PropertyCardTemplateJs } from "./js";

interface PropertyCardTemplateProps extends GraphCardTemplateProps {
  inputValues: List<string>;
  outputValues: List<Param>;
}

class PropertyCardTemplate extends Record<PropertyCardTemplateProps>({
  id: "template.property.base",
  name: "Property",
  inputNames: List(),
  inputValues: List(),
  outputNames: List(),
  outputValues: List(),
  cards: Map(),
  graph: Graph(),
}) {
  static fromJs(js: PropertyCardTemplateJs) {
    return new PropertyCardTemplate({
      id: js.id,
      name: js.name,
      inputNames: List(js.inputNames),
      inputValues: List(js.inputValues),
      outputNames: List(js.outputNames),
      cards: Map(js.cards).map(Card.fromJs),
      graph: Graph(),
    });
  }
}

const isProperty = (
  template: CardTemplate | undefined,
): template is PropertyCardTemplate =>
  !!template && template.id.startsWith("template.property");

export { PropertyCardTemplate, isProperty };
