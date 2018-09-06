import { List } from "immutable";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";

import "common/rxjs";
import { Position2d, Rect, Size2d } from "common/types";

import { Cell, createCell } from "data/Cell";
import { ParamType, TerminalReference } from "data/common";
import { createDirectory, Directory } from "data/Directory";
import { createDocument, Document } from "data/Document";
import { createNode, Node } from "data/Node";
import { createSheet, Sheet } from "data/Sheet";
import { createSource, Source } from "data/Source";
import { createWire, Wire } from "data/Wire";

import {
  ActionTypes,
  setCellSheet,
  setDirectoryDocument,
  setEntityParent,
  setNodeSource,
  setSheetDocument,
  setSourceDocument,
  setWireSource,
} from "./actions";
import { EntityState } from "./model";

const epic: Epic<AnyAction, EntityState> = $action =>
  $action.ofType(ActionTypes.LOAD_EXAMPLE_DOCUMENT).flatMap(_ => [
    createDocument(
      new Document({
        id: "document.example",
        name: "Example Document",
        include: List(),
        version: 0,
      }),
    ),

    createDirectory(
      new Directory({
        id: "directory.attributes",
        name: "Attributes",
        isExpanded: true,
      }),
    ),
    setDirectoryDocument("directory.attributes", "document.example"),

    createSource(
      new Source({
        id: "function.attributeModifier",
        name: "Attribute Modifier",
        inputs: List.of({ name: "Score", type: "number" as ParamType }),
        outputs: List.of({ name: "Modifier", type: "number" as ParamType }),
        type: "function",
      }),
    ),
    setSourceDocument("function.attributeModifier", "document.example"),
    setEntityParent("function.attributeModifier", "directory.attributes"),

    createSource(
      new Source({
        id: "property.strength",
        name: "Strength",
        inputs: List.of({ name: "Score", type: "number" as ParamType }),
        outputs: List.of(
          { name: "Score", type: "number" as ParamType },
          { name: "Modifier", type: "number" as ParamType },
        ),
        type: "property",
      }),
    ),
    setSourceDocument("property.strength", "document.example"),
    setEntityParent("property.strength", "directory.attributes"),

    createNode(
      new Node({
        id: "node.attributeModifier.subtract",
        position: new Position2d(2, 2),
        source: "primitive.subtract",
        values: List.of("0", "10"),
      }),
    ),
    setNodeSource(
      "node.attributeModifier.subtract",
      "function.attributeModifier",
    ),

    createNode(
      new Node({
        id: "node.attributeModifier.divide",
        position: new Position2d(8, 2),
        source: "primitive.divide",
        values: List.of("0", "2"),
      }),
    ),
    setNodeSource(
      "node.attributeModifier.divide",
      "function.attributeModifier",
    ),

    createNode(
      new Node({
        id: "node.attributeModifier.floor",
        position: new Position2d(14, 2),
        source: "primitive.floor",
      }),
    ),
    setNodeSource("node.attributeModifier.floor", "function.attributeModifier"),

    createNode(
      new Node({
        id: "node.strength.attributeModifier",
        position: new Position2d(2, 2),
        source: "function.attributeModifier",
      }),
    ),
    setNodeSource("node.strength.attributeModifier", "property.strength"),

    createWire(
      new Wire({
        id: "wire.attributeModifier.0",
        start: new TerminalReference("function.attributeModifier", "+", 0),
        end: new TerminalReference("node.attributeModifier.subtract", "-", 0),
      }),
    ),
    setWireSource("wire.attributeModifier.0", "function.attributeModifier"),

    createWire(
      new Wire({
        id: "wire.attributeModifier.1",
        start: new TerminalReference("node.attributeModifier.subtract", "+", 0),
        end: new TerminalReference("node.attributeModifier.divide", "-", 0),
      }),
    ),
    setWireSource("wire.attributeModifier.1", "function.attributeModifier"),

    createWire(
      new Wire({
        id: "wire.attributeModifier.2",
        start: new TerminalReference("node.attributeModifier.divide", "+", 0),
        end: new TerminalReference("node.attributeModifier.floor", "-", 0),
      }),
    ),
    setWireSource("wire.attributeModifier.2", "function.attributeModifier"),

    createWire(
      new Wire({
        id: "wire.attributeModifier.3",
        start: new TerminalReference("node.attributeModifier.floor", "+", 0),
        end: new TerminalReference("function.attributeModifier", "-", 0),
      }),
    ),
    setWireSource("wire.attributeModifier.3", "function.attributeModifier"),

    createWire(
      new Wire({
        id: "wire.strength.0",
        start: new TerminalReference("property.strength", "+", 0),
        end: new TerminalReference("property.strength", "-", 0),
      }),
    ),
    setWireSource("wire.strength.0", "property.strength"),

    createWire(
      new Wire({
        id: "wire.strength.1",
        start: new TerminalReference("property.strength", "+", 0),
        end: new TerminalReference("node.strength.attributeModifier", "-", 0),
      }),
    ),
    setWireSource("wire.strength.1", "property.strength"),

    createWire(
      new Wire({
        id: "wire.strength.2",
        start: new TerminalReference("node.strength.attributeModifier", "+", 0),
        end: new TerminalReference("property.strength", "-", 1),
      }),
    ),
    setWireSource("wire.strength.2", "property.strength"),

    createSheet(
      new Sheet({
        id: "sheet.example",
        name: "Example Sheet",
        size: new Size2d(14, 20),
      }),
    ),
    setSheetDocument("sheet.example", "document.example"),

    createCell(
      new Cell({
        id: "cell.example.0",
        rect: new Rect(1, 1, 3, 2),
        terminal: new TerminalReference("property.strength", "+", 0),
      }),
    ),
    setCellSheet("cell.example.0", "sheet.example"),

    createCell(
      new Cell({
        id: "cell.example.1",
        rect: new Rect(3, 1, 5, 2),
        terminal: new TerminalReference("property.strength", "-", 0),
      }),
    ),
    setCellSheet("cell.example.1", "sheet.example"),

    createCell(
      new Cell({
        id: "cell.example.2",
        rect: new Rect(3, 2, 5, 3),
        terminal: new TerminalReference("property.strength", "-", 0),
      }),
    ),
    setCellSheet("cell.example.2", "sheet.example"),
  ]);

export { epic };
