import classnames from "classnames";
import React, { useCallback } from "react";
import { TreeView } from "react-atoms";

import { CommonAttributes } from "common/types";
import { useDocument } from "data/Document";
import { Source, useSourceList } from "data/Source";

import { SourceItemView } from "./SourceItemView";

import "./Sidebar.scss";

interface Props extends CommonAttributes {
  documentId: string;
}

const Sidebar = (props: Props) => {
  const { className, documentId } = props;

  const [document] = useDocument(documentId);
  const [sources] = useSourceList(documentId);

  const getItemKey = useCallback((item: Source) => item.id, []);

  const getItemChildren = useCallback(
    (item?: Source) => (item ? [] : sources),
    [sources],
  );

  // TODO Show item as selected when the current route points to its path
  const renderItem = useCallback(
    (item: Source) => <SourceItemView documentId={document.id} source={item} />,
    [],
  );

  return (
    <div className={classnames("Sidebar", className)}>
      <header className="Sidebar-header">
        <div className="Sidebar-header-name">{document.name}</div>
      </header>
      <TreeView
        className="Sidebar-tree"
        render={renderItem}
        getKey={getItemKey}
        getChildren={getItemChildren}
      />
    </div>
  );
};

export { Sidebar };
