import {Tree} from "common/types";

import {map, mapBranches, mapLeaves, trim} from "../tree";


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
						{ value: "childB1a" },
						{ value: "childB1b" },
					],
				},
			],
		},
	],
};

describe("trim(tree, predicate)", () => {
	it("returns a tree with predicate-failing nodes removed", () => {
		const predicate = jest.fn((tree: Tree<string>) => {
			return !tree.value.endsWith("B");
		});
		expect(trim(testTree, predicate))
			.toEqual({
				value: "root",
				children: [{ value: "childA" }],
			});
	});
	it("skips children of trimmed branches", () => {
		const predicate = jest.fn((tree: Tree<string>) => {
			return !tree.value.endsWith("B");
		});
		trim(testTree, predicate);
		expect(predicate).toHaveBeenCalledWith(
			{ value: "childA" },
			expect.anything(),
			expect.anything(),
		);
		expect(predicate).not.toHaveBeenCalledWith(
			{ value: "childB1" },
			expect.anything(),
			expect.anything(),
		);
	});
});

describe("map(tree, mapBranch, mapLeaf)", () => {
	it("calls mapBranch only on branch nodes", () => {
		const mapBranch = jest.fn(_ => "mapped branch");
		const mapLeaf = jest.fn(_ => "mapped leaf");
		map(testTree, mapBranch, mapLeaf);
		expect(mapBranch)
			.toHaveBeenCalledWith("root");
		expect(mapBranch)
			.toHaveBeenCalledWith("childB2");
		expect(mapBranch)
			.not
			.toHaveBeenCalledWith("childB1");
	});
	it("calls mapLeaf only on branch nodes", () => {
		const mapBranch = jest.fn(_ => "mapped branch");
		const mapLeaf = jest.fn(_ => "mapped leaf");
		map(testTree, mapBranch, mapLeaf);
		expect(mapLeaf)
			.toHaveBeenCalledWith("childA");
		expect(mapLeaf)
			.not
			.toHaveBeenCalledWith("childB");
	});
});

describe("mapBranches(tree, mapBranch)", () => {
	it("doesn't touch leaf nodes", () => {
		const mapBranch = jest.fn(_ => "mapped branch");
		mapBranches(testTree, mapBranch);
		expect(mapBranch)
			.not
			.toHaveBeenCalledWith("childA");
	});
});

describe("mapLeaves(tree, mapLeaf)", () => {
	it("doesn't touch branch nodes", () => {
		const mapLeaf = jest.fn(_ => "mapped leaf");
		mapLeaves(testTree, mapLeaf);
		expect(mapLeaf)
			.not
			.toHaveBeenCalledWith("childB");
	});
});
