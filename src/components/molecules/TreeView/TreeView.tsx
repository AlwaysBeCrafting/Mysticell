import classnames from "classnames";
import { Collection } from "immutable";
import React from "react";

import "./TreeView.scss";

interface Props<I> {
  className?: string;
  render: (item: I) => JSX.Element | null;
  getChildren: (item?: I) => Collection.Indexed<I>;
  getKey: (item: I) => string;
}

class TreeView<I> extends React.PureComponent<Props<I>> {
  render() {
    const { className, getChildren, getKey } = this.props;
    return (
      <ul className={classnames("treeView", className)}>
        {getChildren().map(item => (
          <Item item={item} {...this.props} key={getKey(item)} />
        ))}
      </ul>
    );
  }
}

interface ItemProps<I> extends Props<I> {
  item: I;
}

class Item<I> extends React.PureComponent<ItemProps<I>> {
  render(): JSX.Element {
    const { item, render, getChildren, getKey } = this.props;
    const children = getChildren(item);
    const childrenElem = children.count() > 0 && (
      <ul className="treeView-item-children">
        {children.map(child => (
          <Item item={child} {...this.props} key={getKey(child)} />
        ))}
      </ul>
    );
    return (
      <li className="treeView-item">
        <span className="treeView-item-body">{render(item)}</span>
        {childrenElem}
      </li>
    );
  }
}

export { TreeView };
