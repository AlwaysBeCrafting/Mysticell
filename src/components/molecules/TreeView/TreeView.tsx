import classnames from "classnames";
import React from "react";

import {Tree, TreeNode} from "common/types";

import "./Item.scss";
import "./TreeView.scss";


interface ItemFunctions<T> {
	getName: (item: T) => string;
	getKey: (item: T) => string;
	getIcon: (item: T) => string | undefined;
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
					getIcon={props.getIcon}
					isExpanded={props.isExpanded}
				/>
			))
		}
	</ul>
);

class Item<T> extends React.PureComponent<ItemProps<T>> {
	public render() {
		const {treeNode, getKey, getName, getIcon, isExpanded} = this.props;
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
							getIcon={getIcon}
							isExpanded={isExpanded}
						/>
					))
				}
			</ul>
		);
		const iconUrl = this.props.getIcon(treeNode.item);
		return (
			<li className={classnames("treeView-item", classMod)}>
				<a className="treeView-item-body">
					{
						iconUrl
							? <img className="treeView-item-body-icon"src={iconUrl} />
							: <span className="treeView-item-body-icon mod-dropdown">arrow_drop_down</span>
					}
					<span className="treeView-item-body-title">{this.props.getName(treeNode.item)}</span>
				</a>
				{childrenElem}
			</li>
		);
	}
}


export {TreeView};
