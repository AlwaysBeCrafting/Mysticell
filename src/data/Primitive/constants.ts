import { List } from "immutable";

import { Param, ParamType } from "data/common";

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
    inputNames: List(["In"]),
    outputNames: List(["Out"]),
    evaluate: (params: List<Param>) => params,
  }),

  new Primitive({
    id: "primitive.add",
    name: "Add",
    inputNames: List(["A", "B"]),
    outputNames: List(["Sum"]),
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 0, (x, y) => x + y),
  }),

  new Primitive({
    id: "primitive.subtract",
    name: "Subtract",
    inputNames: List(["A", "B"]),
    outputNames: List(["Difference"]),
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 0, (x, y) => x - y),
  }),

  new Primitive({
    id: "primitive.multiply",
    name: "Multiply",
    inputNames: List(["A", "B"]),
    outputNames: List(["Product"]),
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 1, (x, y) => x * y),
  }),

  new Primitive({
    id: "primitive.divide",
    name: "Divide",
    inputNames: List(["A", "B"]),
    outputNames: List(["Quotient"]),
    evaluate: (params: List<Param>) =>
      verifyAndReduce(params, 1, (x, y) => x / y),
  }),

  new Primitive({
    id: "primitive.floor",
    name: "Floor",
    inputNames: List(["Num"]),
    outputNames: List(["Floor"]),
    evaluate: (params: List<Param>) => verifyAndReduce(params, 0, Math.floor),
  }),
)
  .toMap()
  .mapKeys((_, template) => template.id);

export { PRIMITIVES };
