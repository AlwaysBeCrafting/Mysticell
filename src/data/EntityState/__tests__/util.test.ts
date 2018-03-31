import { Map } from "immutable";

import { EntityTable, JoinManyToOne } from "data/common";
import { Directory } from "data/Directory";
import { Source } from "data/Source";

import { bindIdFromPath } from "../util";

const directories: EntityTable<Directory> = Map({
  a: new Directory({ id: "a", name: "A" }),
  c: new Directory({ id: "c", name: "C" }),
});

const sources: EntityTable<Source> = Map({
  b: new Source({ id: "b", name: "B" }),
  d: new Source({ id: "d", name: "D" }),
});

const entityParents: JoinManyToOne = Map({
  b: "a",
  c: "a",
  d: "c",
});

const idFromPath = bindIdFromPath(
  directories.toSeq().concat(sources),
  entityParents,
);

describe("idFromPath() function", () => {
  it("returns the source ID for a valid source path", () => {
    expect(idFromPath(["A", "B"])).toBe("b");
    expect(idFromPath(["A", "C", "D"])).toBe("d");
  });

  it("returns the directory ID for a valid directory path", () => {
    expect(idFromPath(["A"])).toBe("a");
    expect(idFromPath(["A", "C"])).toBe("c");
  });

  it("returns undefined for an invalid path", () => {
    expect(idFromPath([])).toBeUndefined();
    expect(idFromPath(["C"])).toBeUndefined();
    expect(idFromPath(["A", "D"])).toBeUndefined();
    expect(idFromPath(["nowhere"])).toBeUndefined();
  });
});
