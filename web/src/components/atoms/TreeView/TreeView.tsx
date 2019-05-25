import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";

import { CommonAttributes } from "~/common/types";

interface Props<I> extends CommonAttributes {
  render: (item: I) => React.ReactElement;
  getChildren: (item?: I) => Iterable<I>;
  getKey: (item: I) => string;
}

const TreeView = <I extends any>({
  className,
  render,
  getChildren,
  getKey,
}: Props<I>) => (
  <ul className={classNames("TreeView", className)}>
    {Seq(getChildren()).map(item => (
      <ItemView item={item} {...{ render, getChildren, getKey }} />
    ))}
  </ul>
);

const ItemView = <I extends any>({
  item,
  render,
  getChildren,
  getKey,
}: Props<I> & { item: I }) => {
  const children = Seq(getChildren(item));
  return (
    <li key={getKey(item)}>
      {render(item)}
      {!children.isEmpty() && (
        <ul>
          {children.map(childItem => (
            <ItemView item={childItem} {...{ render, getChildren, getKey }} />
          ))}
        </ul>
      )}
    </li>
  );
};

export { TreeView };
