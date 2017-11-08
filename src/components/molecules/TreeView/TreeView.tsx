import classnames from "classnames";
import { List } from "immutable";
import React from "react";

import { Tree, TreeKey } from "common/types";

import "./TreeView.scss";

interface Props<K extends TreeKey, V> {
  className?: string;
  tree: Tree<K, V>;
  renderItem: (item: V, path: List<K>) => JSX.Element | null;
  getItemKey: (item: V, path: List<K>) => string;
  shouldRenderChildren?: (item: V, path: List<K>) => boolean;
}

class TreeView<K extends TreeKey, V> extends React.PureComponent<Props<K, V>> {
  render() {
    const { className, tree, getItemKey, shouldRenderChildren } = this.props;
    const shouldRecurse =
      !shouldRenderChildren || shouldRenderChildren(tree.value, List());
    return (
      <ul className={classnames("treeView", className)}>
        {shouldRecurse &&
          tree.children
            .toSeq()
            .map((child, key) => (
              <Item
                {...this.props}
                key={getItemKey(child.value, List.of(key))}
                path={List.of(key)}
                tree={child}
              />
            ))
            .toIndexedSeq()}
      </ul>
    );
  }
}

interface ItemProps<K extends TreeKey, V> extends Props<K, V> {
  path: List<K>;
}

class Item<K extends TreeKey, V> extends React.PureComponent<ItemProps<K, V>> {
  render(): JSX.Element {
    const {
      path,
      tree,
      renderItem,
      getItemKey,
      shouldRenderChildren,
    } = this.props;
    const shouldRecurse =
      !shouldRenderChildren || shouldRenderChildren(tree.value, path);
    const childrenElem = shouldRecurse && (
      <ul className="treeView-item-children">
        {tree.children
          .toSeq()
          .map((child, key) => {
            const childPath = path.push(key);
            return (
              <Item
                {...this.props}
                key={getItemKey(child.value, childPath)}
                path={childPath}
                tree={child}
              />
            );
          })
          .toIndexedSeq()}
      </ul>
    );
    return (
      <li className="treeView-item">
        <span className="treeView-item-body">
          {renderItem(tree.value, path)}
        </span>
        {childrenElem}
      </li>
    );
  }
}

export { TreeView };
