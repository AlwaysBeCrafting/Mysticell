import classnames from "classnames";
import React from "react";

import {isBranch, Tree} from "common/types";

import "./Item.scss";
import "./TreeView.scss";


interface ItemFunctions<B, L> {
	getKey: (item: B | L) => string;
	renderItem: (item: B | L) => JSX.Element;
}

interface Props<B, L> extends ItemFunctions<B, L> {
	tree: Array<Tree<B, L>>;
	className?: string;
}

interface ItemProps<B, L> extends ItemFunctions<B, L> {
	tree: Tree<B, L>;
}

const TreeView = <B, L = B>(props: Props<B, L>) => (
	<ul className={classnames("treeView", props.className)}>
		{
			props.tree.map(tree => (
				<Item
					key={props.getKey(tree.value)}
					tree={tree}
					getKey={props.getKey}
					renderItem={props.renderItem}
				/>
			))
		}
	</ul>
);

class Item<B, L> extends React.PureComponent<ItemProps<B, L>> {
	public render() {
		const {tree, getKey, renderItem} = this.props;
		const childrenElem = isBranch(tree) && (
			<ul className="treeView-item-children">
				{
					tree.children.map(child => (
						<Item
							key={getKey(child.value)}
							tree={child}
							getKey={getKey}
							renderItem={renderItem}
						/>
					))
				}
			</ul>
		);
		return (
			<li className="treeView-item">
				<span className="treeView-item-body">
					{renderItem(tree.value)}
				</span>
				{childrenElem}
			</li>
		);
	}
}


export {TreeView};
