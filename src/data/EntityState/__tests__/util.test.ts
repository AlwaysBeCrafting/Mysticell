import { List, Map } from "immutable";

import { NamedEntity } from "data/common";
import { Directory } from "data/Directory";
import { Source } from "data/Source";

import { idFromPath } from "../util";

const entities: Map<string, NamedEntity> = Map({
  a: new Directory({ id: "a", name: "A" }),
  b: new Source({ id: "b", name: "B" }),
  c: new Directory({ id: "c", name: "C" }),
  d: new Source({ id: "d", name: "D" }),
});

const children: Map<string, List<string>> = Map({
  "": List.of("a"),
  a: List.of("b", "c"),
  c: List.of("d"),
});

describe("idFromPath() function", () => {
  it("returns the source ID for a valid source path", () => {
    expect(idFromPath(entities, children, ["A", "B"])).toBe("b");
    expect(idFromPath(entities, children, ["A", "C", "D"])).toBe("d");
  });

  it("returns the directory ID for a valid directory path", () => {
    expect(idFromPath(entities, children, ["A"])).toBe("a");
    expect(idFromPath(entities, children, ["A", "C"])).toBe("c");
  });

  it("returns undefined for an invalid path", () => {
    expect(idFromPath(entities, children, [])).toBeUndefined();
    expect(idFromPath(entities, children, ["C"])).toBeUndefined();
    expect(idFromPath(entities, children, ["A", "D"])).toBeUndefined();
    expect(idFromPath(entities, children, ["nowhere"])).toBeUndefined();
  });
});
