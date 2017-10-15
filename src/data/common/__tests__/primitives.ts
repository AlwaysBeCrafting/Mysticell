import { PARAMS as P } from "data/common";

import { primitives } from "../primitives";

const add = primitives.add.evaluate;

describe("add function", () => {
  it("returns exactly one value", () => {
    expect(add(P.number(3), P.number(2))).toHaveLength(1);
  });

  it("returns the sum of two numbers", () => {
    expect(add(P.number(3), P.number(2))).toEqual([P.number(5)]);
  });

  it("converts a numeric string to a number", () => {
    expect(add(P.number(3), P.string("2"))).toEqual(
      add(P.number(3), P.number(2)),
    );
  });

  it("returns an error from a non-numeric string", () => {
    expect(add(P.number(3), P.string("A"))[0]).toHaveProperty("type", "error");
    expect(add(P.number(3), P.string("-"))[0]).toHaveProperty("type", "error");
  });

  it("treats empty parameters as 0", () => {
    expect(add(P.number(3), P.empty())).toEqual(add(P.number(3), P.number(0)));
  });

  it("treats whitespace-only strings as empty", () => {
    expect(add(P.number(3), P.string(""))).toEqual(add(P.number(3), P.empty()));
    expect(add(P.number(3), P.string(" "))).toEqual(
      add(P.number(3), P.empty()),
    );
  });

  it("treats missing parameters as empty", () => {
    expect(add()).toEqual(add(P.empty(), P.empty()));
    expect(add(P.number(3))).toEqual(add(P.number(3), P.empty()));
  });
});

const subtract = primitives.subtract.evaluate;

describe("subtract primitive", () => {
  it("returns exactly one value", () => {
    expect(subtract(P.number(3), P.number(2))).toHaveLength(1);
  });

  it("returns the difference of two numbers", () => {
    expect(subtract(P.number(3), P.number(2))).toEqual([P.number(1)]);
  });

  it("converts a numeric string to a number", () => {
    expect(subtract(P.number(3), P.string("2"))).toEqual(
      subtract(P.number(3), P.number(2)),
    );
  });

  it("returns an error from a non-numeric string", () => {
    expect(subtract(P.number(3), P.string("A"))[0]).toHaveProperty(
      "type",
      "error",
    );
    expect(subtract(P.number(3), P.string("-"))[0]).toHaveProperty(
      "type",
      "error",
    );
  });

  it("treats empty parameters as 0", () => {
    expect(subtract(P.number(3), P.empty())).toEqual(
      subtract(P.number(3), P.number(0)),
    );
  });

  it("treats whitespace-only strings as empty", () => {
    expect(subtract(P.number(3), P.string(""))).toEqual(
      subtract(P.number(3), P.empty()),
    );
    expect(subtract(P.number(3), P.string(" "))).toEqual(
      subtract(P.number(3), P.empty()),
    );
  });

  it("treats missing parameters as empty", () => {
    expect(subtract()).toEqual(subtract(P.empty(), P.empty()));
    expect(subtract(P.number(3))).toEqual(subtract(P.number(3), P.empty()));
  });
});

const multiply = primitives.multiply.evaluate;

describe("multiply primitive", () => {
  it("returns exactly one value", () => {
    expect(multiply(P.number(3), P.number(2))).toHaveLength(1);
  });

  it("returns the product of two numbers", () => {
    expect(multiply(P.number(3), P.number(2))).toEqual([P.number(6)]);
  });

  it("converts a numeric string to a number", () => {
    expect(multiply(P.number(3), P.string("2"))).toEqual(
      multiply(P.number(3), P.number(2)),
    );
  });

  it("returns an error from a non-numeric string", () => {
    expect(multiply(P.number(3), P.string("A"))[0]).toHaveProperty(
      "type",
      "error",
    );
    expect(multiply(P.number(3), P.string("-"))[0]).toHaveProperty(
      "type",
      "error",
    );
  });

  it("treats empty parameters as 1", () => {
    expect(multiply(P.number(3), P.empty())).toEqual(
      multiply(P.number(3), P.number(1)),
    );
  });

  it("treats whitespace-only strings as empty", () => {
    expect(multiply(P.number(3), P.string(""))).toEqual(
      multiply(P.number(3), P.empty()),
    );
    expect(multiply(P.number(3), P.string(" "))).toEqual(
      multiply(P.number(3), P.empty()),
    );
  });

  it("treats missing parameters as empty", () => {
    expect(multiply()).toEqual(multiply(P.empty(), P.empty()));
    expect(multiply(P.number(3))).toEqual(multiply(P.number(3), P.empty()));
  });
});

const divide = primitives.divide.evaluate;

describe("divide primitive", () => {
  it("returns exactly one value", () => {
    expect(divide(P.number(6), P.number(2))).toHaveLength(1);
  });

  it("returns the product of two numbers", () => {
    expect(divide(P.number(6), P.number(2))).toEqual([P.number(3)]);
  });

  it("converts a numeric string to a number", () => {
    expect(divide(P.number(6), P.string("2"))).toEqual(
      divide(P.number(6), P.number(2)),
    );
  });

  it("returns an error from a non-numeric string", () => {
    expect(divide(P.number(6), P.string("A"))[0]).toHaveProperty(
      "type",
      "error",
    );
    expect(divide(P.number(6), P.string("-"))[0]).toHaveProperty(
      "type",
      "error",
    );
  });

  it("treats empty parameters as 1", () => {
    expect(divide(P.number(6), P.empty())).toEqual(
      divide(P.number(6), P.number(1)),
    );
  });

  it("treats whitespace-only strings as empty", () => {
    expect(divide(P.number(6), P.string(""))).toEqual(
      divide(P.number(6), P.empty()),
    );
    expect(divide(P.number(6), P.string(" "))).toEqual(
      divide(P.number(6), P.empty()),
    );
  });

  it("treats missing parameters as empty", () => {
    expect(divide()).toEqual(divide(P.empty(), P.empty()));
    expect(divide(P.number(6))).toEqual(divide(P.number(6), P.empty()));
  });
});

const floor = primitives.floor.evaluate;

describe("floor primitive", () => {
  it("returns exactly one value", () => {
    expect(floor(P.number(3))).toHaveLength(1);
  });

  it("returns an integer without change", () => {
    expect(floor(P.number(0))).toEqual([P.number(0)]);
    expect(floor(P.number(3))).toEqual([P.number(3)]);
  });

  it("returns a decimal number rounded down", () => {
    expect(floor(P.number(3.2))).toEqual([P.number(3)]);
  });

  it("treats empty parameters as 0", () => {
    expect(floor(P.empty())).toEqual(floor(P.number(0)));
  });
});
