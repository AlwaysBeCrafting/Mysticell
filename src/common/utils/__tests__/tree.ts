import {Tree} from "common/types";

import {trim} from "../tree";


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
