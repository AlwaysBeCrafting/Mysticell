import classNames from "classnames";
import React from "react";

import { ObjMap, TreeNode } from "common/types";

import "./Item.scss";


interface Props<T> {
	treeNode: TreeNode<T>;
	path: string[];
	expandedItems: ObjMap<boolean>;
}

const Item = <T extends {}>(props: Props<T>) => {
	const { treeNode, path, expandedItems } = props;
	const className = classNames(
		"treeView-item",
		{
			"is-expanded": expandedItems[treeNode.name],
			"is-parent": treeNode.type === "parent",
		},
	);

	const childrenElem = treeNode.type === "parent" && (
		<ul className="treeView-item-children">
			{
				treeNode.children.map(child  => (
					<Item
						treeNode={ child }
						path={ [ ...path, child.name ] }
						expandedItems={ expandedItems }
						key={ child.name }
					/>
				))
			}
		</ul>
	);

	return (
		<li className={ className }>
			<a className="treeView-item-body">
				<span className="treeView-item-body-icon">arrow_drop_down</span>
				<span className="treeView-item-body-title">{ treeNode.name }</span>
			</a>
			{ childrenElem }
		</li>
	);
};


export { Item };
