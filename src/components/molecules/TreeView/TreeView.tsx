import classnames from "classnames";
import React from "react";

import {Tree, TreeNode} from "common/types";

import "./Item.scss";
import "./TreeView.scss";


interface ItemFunctions<T> {
	getKey: (item: T) => string;
	renderItem: (item: T) => JSX.Element;
	shouldRenderChildren?: (item: T) => boolean;
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
					renderItem={props.renderItem}
					shouldRenderChildren={props.shouldRenderChildren}
				/>
			))
		}
	</ul>
);

class Item<T> extends React.PureComponent<ItemProps<T>> {
	public render() {
		const {treeNode, getKey, renderItem} = this.props;
		const itemIsParent = this.props.shouldRenderChildren || (_ => true);
		const classMod = classnames({
			"is-expanded": itemIsParent(treeNode.item),
			"is-parent": treeNode.children.length > 0,
		});
		const childrenElem = itemIsParent(treeNode.item) && (
			<ul className="treeView-item-children">
				{
					treeNode.children.map(child => (
						<Item
							key={getKey(child.item)}
							treeNode={child}
							getKey={getKey}
							renderItem={renderItem}
							shouldRenderChildren={itemIsParent}
						/>
					))
				}
			</ul>
		);
		return (
			<li className={classnames("treeView-item", classMod)}>
				<span className="treeView-item-body">
					{renderItem(treeNode.item)}
				</span>
				{childrenElem}
			</li>
		);
	}
}


export {TreeView};
