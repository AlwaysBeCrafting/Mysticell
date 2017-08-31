import classNames from "classnames";
import React from "react";

import {ObjMap, Tree} from "common/types";

import {Item} from "./Item";
import "./TreeView.scss";


interface Props<T> {
	tree: Tree<T>;
	expandedItems: ObjMap<boolean>;
	className?: string;
}

const TreeView = <T extends {}>({tree, expandedItems, className}: Props<T>) => (
	<ul className={classNames("treeView", className)}>
		{
			tree.map(treeNode => (
				<Item
					key={treeNode.name}
					treeNode={treeNode}
					path={[treeNode.name]}
					expandedItems={expandedItems}
				/>
			))
		}
	</ul>
);


export {TreeView};
