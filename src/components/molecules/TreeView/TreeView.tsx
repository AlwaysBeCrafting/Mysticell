import classnames from "classnames";
import React from "react";

import { isBranch, Tree } from "common/types";

import "./TreeView.scss";

interface ItemFunctions<B, L> {
  getKey: (tree: Tree<B, L>) => string;
  renderItem: (tree: Tree<B, L>, path: B[]) => JSX.Element;
}

interface Props<B, L> extends ItemFunctions<B, L> {
  tree: Tree<B, L>;
  className?: string;
}

interface ItemProps<B, L> extends ItemFunctions<B, L> {
  tree: Tree<B, L>;
  path: B[];
}

const TreeView = <B, L = B>(props: Props<B, L>) => (
  <ul className={classnames("treeView", props.className)}>
    {isBranch(props.tree) &&
      props.tree.children.map(tree => (
        <Item
          key={props.getKey(tree)}
          tree={tree}
          getKey={props.getKey}
          renderItem={props.renderItem}
          path={["root"]}
        />
      ))}
  </ul>
);

class Item<B, L> extends React.PureComponent<ItemProps<B, L>> {
  public render(): JSX.Element {
    const { tree, path, getKey, renderItem } = this.props;
    const childrenElem: boolean | JSX.Element = isBranch(tree) && (
      <ul className="treeView-item-children">
        {tree.children.map(child => (
          <Item
            key={getKey(child)}
            tree={child}
            getKey={getKey}
            renderItem={renderItem}
            path={[...path, tree.value]}
          />
        ))}
      </ul>
    );
    return (
      <li className="treeView-item">
        <span className="treeView-item-body">{renderItem(tree, path)}</span>
        {childrenElem}
      </li>
    );
  }
}

export { TreeView };
