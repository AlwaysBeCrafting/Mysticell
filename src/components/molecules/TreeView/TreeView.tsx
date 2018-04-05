import classnames from "classnames";
import { Seq } from "immutable";
import React from "react";

import "./TreeView.scss";

interface Props<I> {
  className?: string;
  render: (item: I) => JSX.Element | null;
  getChildren: (item?: I) => Iterable<I>;
  getKey: (item: I) => string;
}

class TreeView<I> extends React.PureComponent<Props<I>> {
  render() {
    const { className, getChildren, getKey } = this.props;
    return (
      <ul className={classnames("treeView", className)}>
        {Seq.Indexed(getChildren()).map(child => (
          <Item item={child} {...this.props} key={getKey(child)} />
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
    const children = Seq.Indexed(getChildren(item));
    const childrenElem = children.count() > 0 && (
      <ul className="treeView-item-children">
        {children.map(child => (
          <Item {...this.props} item={child} key={getKey(child)} />
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
