import classnames from "classnames";
import React from "react";
import { TreeView } from "react-atoms";

import { CommonAttributes } from "common/types";

import { EntityTable } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Source } from "data/Source";

import { DirectoryItemView } from "./DirectoryItemView";
import { SourceItemView } from "./SourceItemView";

import "./Sidebar.scss";

interface Props extends CommonAttributes {
  document: Document;
  directories: EntityTable<Directory>;
  sources: EntityTable<Source>;
}

class Sidebar extends React.PureComponent<Props> {
  render() {
    const { className, document } = this.props;
    return (
      <div className={classnames("Sidebar", className)}>
        <header className="Sidebar-header">
          <div className="Sidebar-header-name">{document.name}</div>
        </header>
        <TreeView
          className="Sidebar-tree"
          render={this.renderItem}
          getKey={this.getItemKey}
          getChildren={this.getItemChildren}
        />
      </div>
    );
  }

  private renderItem = (item: Directory | Source) => {
    if (item.id.startsWith("directory")) {
      return (
        <DirectoryItemView
          name={item.name}
          expanded={(item as Directory).isExpanded}
        />
      );
    } else {
      // TODO Show as selected when the current route points to its path
      return (
        <SourceItemView
          id={item.id}
          name={item.name}
          type={(item as Source).type}
          selected={false}
        />
      );
    }
  };

  private getItemKey = (item: Directory | Source) => item.id;

  private getItemChildren = (_?: Directory | Source) => [];
}

export { Sidebar, Props };
