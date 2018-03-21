import { List } from "immutable";

import { Param, ParamType } from "data/common";
import { PinGroup } from "data/PinGroup";

import { Primitive } from "./model";

const asNumber = (identity = 0) => (param: Param) =>
  typeof param === "number" ? param : identity;

const asError = (type: ParamType = "number") => (param: Param): Error => {
  if (typeof param === "object") {
    return param;
  }
  const err = new Error(`Expected ${type}, got ${typeof param}`);
  err.name = "TYPE";
  return err;
};

type Operator = (...nums: number[]) => number;

const verifyAndReduce = (
  params: List<Param>,
  identity: number,
  op: Operator,
): List<Param> => {
  const convParams = params.map(param => {
    if (typeof param === "number") {
      return asNumber(identity)(param);
    } else {
      return asError()(param);
    }
  });
  const error = params.find(param => typeof param === "object");
  if (error) {
    return List.of(error);
  }
  return List.of(op(...(convParams as List<number>)));
};

const PRIMITIVES = List.of(
  new Primitive({
    id: "primitive.noop",
    name: "No-op",
    inputPins: List.of({ name: "In", type: "undefined" }) as PinGroup,
    outputPins: List.of({ name: "Out", type: "undefined" }) as PinGroup,
    evaluate: (params: List<Param>) => params,
  }),

  new Primitive({
    id: "primitive.add",
    name: "Add",
    inputPins: List.of(
      { name: "A", type: "number" },
      { name: "B", type: "number" },
    ) as PinGroup,
    outputPins: List.of({ name: "Sum", type: "number" }) as PinGroup,
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 0, (x, y) => x + y),
  }),

  new Primitive({
    id: "primitive.subtract",
    name: "Subtract",
    inputPins: List.of(
      { name: "A", type: "number" },
      { name: "B", type: "number" },
    ) as PinGroup,
    outputPins: List.of({ name: "Difference", type: "number" }) as PinGroup,
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 0, (x, y) => x - y),
  }),

  new Primitive({
    id: "primitive.multiply",
    name: "Multiply",
    inputPins: List.of(
      { name: "A", type: "number" },
      { name: "B", type: "number" },
    ) as PinGroup,
    outputPins: List.of({ name: "Product", type: "number" }) as PinGroup,
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 1, (x, y) => x * y),
  }),

  new Primitive({
    id: "primitive.divide",
    name: "Divide",
    inputPins: List.of(
      { name: "A", type: "number" },
      { name: "B", type: "number" },
    ) as PinGroup,
    outputPins: List.of({ name: "Quotient", type: "number" }) as PinGroup,
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 1, (x, y) => x / y),
  }),

  new Primitive({
    id: "primitive.floor",
    name: "Floor",
    inputPins: List.of({ name: "Num", type: "number" }) as PinGroup,
    outputPins: List.of({ name: "Floor", type: "number" }) as PinGroup,
    evaluate: (params: List<Param>) => verifyAndReduce(params, 0, Math.floor),
  }),
)
  .toMap()
  .mapKeys((_, template) => template.id);

export { PRIMITIVES };
