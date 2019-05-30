import classnames from "classnames";
import React, { useCallback } from "react";

import { CommonAttributes } from "~/common/types";
import { TreeView } from "~/components/atoms";
import { useDocument } from "~/data/Document";
import { useSourceList } from "~/data/Source";

import { SourceItemView } from "./SourceItemView";

import "./Sidebar.scss";

interface Props extends CommonAttributes {
  documentId: string;
}

const Sidebar = (props: Props) => {
  const { className, documentId } = props;

  const [document] = useDocument(documentId);
  if (!document) return null;

  const [sources] = useSourceList(documentId);

  const getItemKey = useCallback((item: string) => item, []);

  const getItemChildren = useCallback(
    (item?: string) => (item ? [] : sources),
    [sources],
  );

  // TODO Show item as selected when the current route points to its path
  const renderItem = useCallback(
    (item: string) => (
      <SourceItemView documentId={documentId} sourceId={item} />
    ),
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
