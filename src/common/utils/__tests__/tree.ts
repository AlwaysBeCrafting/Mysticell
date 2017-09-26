import {Tree} from "common/types";

import {collapse, map, mapBranches, mapLeaves, resolvePath} from "../tree";


const testTree: Readonly<Tree<string>> = {
	value: "root",
	children: [
		{ value: "childA" },
		{
			value: "childB",
			children: [
				{ value: "childB1" },
				{
					value: "childB2",
					children: [
						{ value: "childB2a" },
						{ value: "childB2b" },
					],
				},
			],
		},
	],
};

describe("collapse(tree, isExpanded)", () => {
	const isExpanded = jest.fn(tree => (
		tree.value === "root" ||
		tree.value === "childB"
	));
	beforeEach(() => {
		isExpanded.mockClear();
	});
	it("returns a tree with no children in collapsed branches", () => {
		expect(collapse(testTree, isExpanded))
			.toEqual(
				{ value: "root",
					children: [
						{ value: "childA" },
						{ value: "childB",
							children: [
								{ value: "childB1" },
								{ value: "childB2", children: [] },
							],
						},
					],
				},
			);
	});
});

describe("map(tree, mapBranch, mapLeaf)", () => {
	const mapBranch = jest.fn(_ => "mapped branch");
	const mapLeaf = jest.fn(_ => "mapped leaf");
	beforeEach(() => {
		mapBranch.mockClear();
		mapLeaf.mockClear();
	});
	it("calls mapBranch only on branch nodes", () => {
		map(testTree, mapBranch, mapLeaf);
		expect(mapBranch)
			.toHaveBeenCalledWith("root", expect.anything());
		expect(mapBranch)
			.toHaveBeenCalledWith("childB2", expect.anything());
		expect(mapBranch)
			.not
			.toHaveBeenCalledWith("childB1", expect.anything());
	});
	it("calls mapLeaf only on branch nodes", () => {
		map(testTree, mapBranch, mapLeaf);
		expect(mapLeaf)
			.toHaveBeenCalledWith("childA", expect.anything());
		expect(mapLeaf)
			.not
			.toHaveBeenCalledWith("childB", expect.anything());
	});
	it("gives a complete path to both callbacks", () => {
		map(testTree, mapBranch, mapLeaf);
		expect(mapBranch)
			.toHaveBeenCalledWith("childB2", ["root", "childB"]);
		expect(mapLeaf)
			.toHaveBeenCalledWith("childB2a", ["root", "childB", "childB2"]);
	});
});

describe("mapBranches(tree, mapBranch)", () => {
	it("doesn't touch leaf nodes", () => {
		const mapBranch = jest.fn(_ => "mapped branch");
		mapBranches(testTree, mapBranch);
		expect(mapBranch)
			.not
			.toHaveBeenCalledWith("childA", expect.anything());
	});
});

describe("mapLeaves(tree, mapLeaf)", () => {
	it("doesn't touch branch nodes", () => {
		const mapLeaf = jest.fn(_ => "mapped leaf");
		mapLeaves(testTree, mapLeaf);
		expect(mapLeaf)
			.not
			.toHaveBeenCalledWith("childB", expect.anything());
	});
});

describe("resolvePath(tree, path, compare)", () => {
	it("checks for === equality when compare isn't given", () => {
		const path = ["childB", "childB2", "childB2b"];
		expect(resolvePath(testTree, path))
			.toEqual({ value: "childB2b" });
	});
	it("returns the whole tree when the path is empty", () => {
		expect(resolvePath(testTree, []))
			.toEqual(testTree);
	});
	it("throws an exception when the path doesn't exist", () => {
		expect(() => resolvePath(testTree, ["wrongNode"]))
			.toThrow();
	});
});
