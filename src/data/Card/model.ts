import { List, Record } from "immutable";
import shortid from "shortid";

import { Position2d } from "common/types";

import { CardTemplate, isProperty } from "data/CardTemplate";
import { Palette } from "data/Palette";

import { CardJs } from "./js";

interface CardProps {
  id: string;
  template: string;
  label?: string;
  values: List<string>;
  position: Position2d;
}

class Card extends Record<CardProps>({
  id: "card.base",
  template: "",
  values: List(),
  position: new Position2d(),
}) {
  static fromJs(js: CardJs) {
    return new Card({
      id: js.id,
      template: js.template,
      label: js.label,
      values: List(js.values),
      position: new Position2d(js.position.x, js.position.y),
    });
  }
  static fromTemplate(template: CardTemplate, id?: string) {
    return new Card({
      id: id || `card.${shortid()}`,
      template: template.id,
      values: List(template.inputNames).map(_ => ""),
    });
  }

  snapshot(palette: Palette): CardSnapshot {
    return CardSnapshot.fromCard(this, palette);
  }
}

interface SnapshotInput {
  name: string;
  value: string;
  isEditable: boolean;
  hasPin: boolean;
}

interface SnapshotOutput {
  name: string;
}

interface CardSnapshot {
  id: string;
  label?: string;
  name: string;
  template: string;
  inputs: SnapshotInput[];
  outputs: SnapshotOutput[];
  position: { x: number; y: number };
}

namespace CardSnapshot {
  export function fromCard(card: Card, palette: Palette): CardSnapshot {
    const template = palette.templates.get(card.template);
    if (!template) {
      throw new Error(
        `Can't find template ${card.template} for card ${card.id}`,
      );
    }
    const templateIsProperty = isProperty(template);
    return {
      id: card.id,
      label: card.label,
      name: template.name,
      template: template.id,
      inputs: template.inputNames
        .map((name, i) => ({
          name,
          value: card.values.get(i, ""),
          isEditable: true,
          hasPin: !templateIsProperty,
        }))
        .toArray(),
      outputs: template.outputNames.map(name => ({ name })).toArray(),
      position: { x: card.position.x, y: card.position.y },
    };
  }

  export function fromTemplate(template: CardTemplate): CardSnapshot {
    const templateIsProperty = isProperty(template);
    return {
      id: "card.snapshot",
      name: template.name,
      template: template.id,
      inputs: template.inputNames
        .map(name => ({
          name,
          value: "",
          isEditable: true,
          hasPin: !templateIsProperty,
        }))
        .toArray(),
      outputs: template.outputNames.map(name => ({ name })).toArray(),
      position: { x: 0, y: 0 },
    };
  }
}

export { Card, CardSnapshot };
