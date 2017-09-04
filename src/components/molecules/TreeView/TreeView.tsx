import classnames from "classnames";
import React from "react";

import {Tree, TreeNode} from "common/types";

import "./Item.scss";
import "./TreeView.scss";


interface ItemFunctions<T> {
	getName: (item: T) => string;
	getKey: (item: T) => string;
	isExpanded?: (item: T) => boolean;
}

interface Props<T> extends ItemFunctions<T> {
	tree: Tree<T>;
	className?: string;
}

interface ItemProps<T> extends ItemFunctions<T> {
	treeNode: TreeNode<T>;
}

const TreeView = <T extends {}>(props: Props<T>) => (
	<ul className={classnames("treeView", props.className)}>
		{
			props.tree.map(treeNode => (
				<Item
					key={props.getKey(treeNode.item)}
					treeNode={treeNode}
					getKey={props.getKey}
					getName={props.getName}
					isExpanded={props.isExpanded}
				/>
			))
		}
	</ul>
);

const Item = <T extends {}>(props: ItemProps<T>) => {
	const {treeNode, getKey, getName, isExpanded} = props;
	const classMod = classnames({
		"is-expanded": isExpanded ? isExpanded(treeNode.item) : true,
		"is-parent": treeNode.children.length > 0,
	});

	const childrenElem = treeNode.children.length > 0 && (
		<ul className="treeView-item-children">
			{
				treeNode.children.map(child => (
					<Item
						key={getKey(child.item)}
						treeNode={child}
						getKey={getKey}
						getName={getName}
						isExpanded={isExpanded}
					/>
				))
			}
		</ul>
	);

	return (
		<li className={classnames("treeView-item", classMod)}>
			<a className="treeView-item-body">
				<span className="treeView-item-body-icon">arrow_drop_down</span>
				<span className="treeView-item-body-title">{props.getName(treeNode.item)}</span>
			</a>
			{childrenElem}
		</li>
	);
};


export {TreeView};
