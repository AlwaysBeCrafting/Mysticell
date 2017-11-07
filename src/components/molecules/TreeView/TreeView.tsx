import classnames from "classnames";
import React from "react";

import "./TreeView.scss";

interface Props<T> {
  className?: string;
  renderItem: (path: T[]) => JSX.Element;
  getItemKey: (path: T[]) => string;
  getChildren: (path: T[]) => T[];
}

class TreeView<T> extends React.PureComponent<Props<T>> {
  render() {
    const { className, renderItem, getItemKey, getChildren } = this.props;
    return (
      <ul className={classnames("treeView", className)}>
        {getChildren([]).map(child => (
          <Item
            key={getItemKey([child])}
            path={[child]}
            renderItem={renderItem}
            getItemKey={getItemKey}
            getChildren={getChildren}
          />
        ))}
      </ul>
    );
  }
}

interface ItemProps<T> extends Props<T> {
  path: T[];
}

class Item<T> extends React.PureComponent<ItemProps<T>> {
  render(): JSX.Element {
    const { path, renderItem, getItemKey, getChildren } = this.props;
    const childrenElem = (
      <ul className="treeView-item-children">
        {getChildren(path).map(child => (
          <Item
            key={getItemKey([...path, child])}
            path={[...path, child]}
            renderItem={renderItem}
            getItemKey={getItemKey}
            getChildren={getChildren}
          />
        ))}
      </ul>
    );
    return (
      <li className="treeView-item">
        <span className="treeView-item-body">{renderItem(path)}</span>
        {childrenElem}
      </li>
    );
  }
}

export { TreeView };
