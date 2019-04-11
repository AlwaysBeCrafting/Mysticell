import classnames from "classnames";
import React, { useEffect, useCallback } from "react";
import { TreeView } from "react-atoms";

import { CommonAttributes } from "common/types";

import { EntityTable } from "data/common";
import { Document } from "data/Document";
import { Source } from "data/Source";

import { SourceItemView } from "./SourceItemView";

import "./Sidebar.scss";

interface Props extends CommonAttributes {
  document: Document;
  sources: EntityTable<Source>;
  listSources: () => void;
}

const Sidebar = (props: Props) => {
  const { className, document, sources, listSources } = props;

  useEffect(listSources, []);

  const getItemKey = useCallback((item: Source) => item.id, []);

  const getItemChildren = useCallback(
    (item?: Source) => (item ? [] : sources.entities.toList()),
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

export { Sidebar, Props };
