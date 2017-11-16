import { List, Map, Repeat } from "immutable";

import { Graph } from "common/types";

import { Card } from "data/Card";
import {
  CardTemplate,
  FunctionCardTemplate,
  NodeValue,
  PRIMITIVES,
  PropertyCardTemplate,
} from "data/CardTemplate";
import { EdgeValue } from "data/CardTemplate/Graph/model";
import { Param, PARAMS } from "data/common";
import { Palette } from "data/Palette";

import { resolveGraph } from "../graph";

const basicProperty = new PropertyCardTemplate({
  id: "template.property.basic",
  inputValues: List.of("10"),
  graph: Graph.from<NodeValue, EdgeValue>(
    [
      ["0", { type: "boundary", wireAnchor: "start", index: 0 }],
      ["1", { type: "boundary", wireAnchor: "end", index: 0 }],
    ],
    [["0", "1", "external"]],
  ),
});

const abilityModifier = new FunctionCardTemplate({
  id: "template.function.abilityModifier",
  cards: Map([
    [
      "card.0",
      new Card({
        id: "card.0",
        template: "template.primitive.subtract",
        values: List.of("0", "10"),
      }),
    ],
    [
      "card.1",
      new Card({
        id: "card.1",
        template: "template.primitive.divide",
        values: List.of("0", "2"),
      }),
    ],
    [
      "card.2",
      new Card({
        id: "card.2",
        template: "template.primitive.floor",
        values: List.of("0"),
      }),
    ],
  ]),
  graph: Graph.from<NodeValue, EdgeValue>(
    [
      ["0", { type: "boundary", wireAnchor: "start", index: 0 }],
      ["1", { type: "card", card: "card.0", wireAnchor: "end", index: 0 }],
      ["2", { type: "card", card: "card.0", wireAnchor: "end", index: 1 }],
      ["3", { type: "card", card: "card.0", wireAnchor: "start", index: 0 }],
      ["4", { type: "card", card: "card.1", wireAnchor: "end", index: 0 }],
      ["5", { type: "card", card: "card.1", wireAnchor: "end", index: 1 }],
      ["6", { type: "card", card: "card.1", wireAnchor: "start", index: 0 }],
      ["7", { type: "card", card: "card.2", wireAnchor: "end", index: 0 }],
      ["8", { type: "card", card: "card.2", wireAnchor: "start", index: 0 }],
      ["9", { type: "boundary", wireAnchor: "end", index: 0 }],
    ],
    [
      ["0", "1", "external"],
      ["3", "4", "external"],
      ["6", "7", "external"],
      ["8", "9", "external"],
      ["1", "3", "internal"],
      ["2", "3", "internal"],
      ["4", "6", "internal"],
      ["5", "6", "internal"],
      ["7", "8", "internal"],
    ],
  ),
});

const strength = new PropertyCardTemplate({
  id: "template.property.strength",
  inputValues: List.of("15"),
  cards: Map([
    [
      "card.3",
      new Card({ id: "card.3", template: "template.function.abilityModifier" }),
    ],
  ]),
  graph: Graph.from<NodeValue, EdgeValue>(
    [
      ["10", { type: "boundary", wireAnchor: "start", index: 0 }],
      ["11", { type: "card", card: "card.3", wireAnchor: "end", index: 0 }],
      ["12", { type: "card", card: "card.3", wireAnchor: "start", index: 0 }],
      ["13", { type: "boundary", wireAnchor: "end", index: 0 }],
      ["14", { type: "boundary", wireAnchor: "end", index: 1 }],
    ],
    [
      ["10", "11", "external"],
      ["10", "13", "external"],
      ["12", "14", "external"],
      ["11", "12", "internal"],
    ],
  ),
});

const cycle = new PropertyCardTemplate({
  id: "template.property.cycle",
  inputValues: List.of("1"),
  cards: Map([
    ["card.4", new Card({ id: "card.4", template: "template.primitive.add" })],
    ["card.5", new Card({ id: "card.5", template: "template.primitive.add" })],
  ]),
  graph: Graph.from<NodeValue, EdgeValue>(
    [
      ["15", { type: "boundary", wireAnchor: "start", index: 0 }],
      ["16", { type: "card", card: "card.4", wireAnchor: "end", index: 0 }],
      ["17", { type: "card", card: "card.4", wireAnchor: "end", index: 1 }],
      ["18", { type: "card", card: "card.4", wireAnchor: "start", index: 0 }],
      ["19", { type: "card", card: "card.5", wireAnchor: "end", index: 0 }],
      ["20", { type: "card", card: "card.5", wireAnchor: "end", index: 1 }],
      ["21", { type: "card", card: "card.5", wireAnchor: "start", index: 0 }],
      ["22", { type: "boundary", wireAnchor: "end", index: 0 }],
    ],
    [
      ["15", "16", "external"],
      ["18", "19", "external"],
      ["21", "17", "external"],
      ["21", "22", "external"],
      ["16", "18", "internal"],
      ["17", "18", "internal"],
      ["19", "21", "internal"],
      ["20", "21", "internal"],
    ],
  ),
});

const selfReference = new PropertyCardTemplate({
  id: "template.property.selfReference",
  inputValues: List.of("1"),
  cards: Map([
    [
      "card.6",
      new Card({ id: "card.6", template: "template.property.selfReference" }),
    ],
  ]),
  graph: Graph.from<NodeValue, EdgeValue>(
    [
      ["23", { type: "boundary", wireAnchor: "start", index: 0 }],
      ["24", { type: "card", card: "card.6", wireAnchor: "end", index: 0 }],
      ["25", { type: "card", card: "card.6", wireAnchor: "start", index: 0 }],
      ["26", { type: "boundary", wireAnchor: "end", index: 0 }],
    ],
    [
      ["23", "24", "external"],
      ["25", "26", "external"],
      ["24", "25", "internal"],
    ],
  ),
});

const testPalette = new Palette({
  templates: Map(PRIMITIVES).merge<string, CardTemplate>(
    [basicProperty, abilityModifier, strength, cycle, selfReference].map(
      t => [t.id, t] as [string, CardTemplate],
    ),
  ),
});

describe("evaluateGraph", () => {
  it("sends values from input nodes to directly-connected output nodes", () => {
    expect(resolveGraph(basicProperty, testPalette)).toEqual(
      List.of(PARAMS.string("10")),
    );
  });

  it("resolves primitive function calls", () => {
    expect(
      resolveGraph(abilityModifier, testPalette, List.of(PARAMS.string("10"))),
    ).toEqual(List.of(PARAMS.number(0)));
  });

  it("resolves transcluded templates", () => {
    expect(resolveGraph(strength, testPalette)).toEqual(
      List.of<Param>(PARAMS.string("15"), PARAMS.number(2)),
    );
  });

  it("returns an error when a node cycle is detected", () => {
    const result = resolveGraph(cycle, testPalette);
    expect(result.map(val => val.type)).toEqual(
      Repeat("error", result.size).toList(),
    );
  });

  it("returns an error when a graph references itself", () => {
    const result = resolveGraph(selfReference, testPalette);
    expect(result.map(val => val.type)).toEqual(
      Repeat("error", result.size).toList(),
    );
  });
});
