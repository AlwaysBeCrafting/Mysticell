import classnames from "classnames";
import React from "react";
import { TreeView } from "react-atoms";

import { CommonAttributes } from "common/types";

import { EntityTable, JoinManyToOne } from "data/common";
import { Directory } from "data/Directory";
import { Document } from "data/Document";
import { Source } from "data/Source";

import { DirectoryItemView } from "./DirectoryItemView";
import { SourceItemView } from "./SourceItemView";

import "./Sidebar.scss";

const lexComp = (a: string, b: string) => a.localeCompare(b);

interface Props extends CommonAttributes {
  document: Document;
  directories: EntityTable<Directory>;
  sources: EntityTable<Source>;
  entityParents: JoinManyToOne;
}

class Sidebar extends React.PureComponent<Props> {
  render() {
    const { className, document } = this.props;
    return (
      <div className={classnames("sidebar", className)}>
        <header className="sidebar-header">
          <div className="sidebar-header-name">{document.name}</div>
        </header>
        <TreeView
          className="sidebar-tree"
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

  private getItemChildren = (item?: Directory | Source) => {
    const { directories, sources, entityParents } = this.props;

    const entities = directories.toSeq().concat(sources);

    const childIds = item
      ? entityParents.toSeq().filter(parentId => parentId === item.id)
      : entities.filter(entity => !entityParents.has(entity.id));

    return entities
      .toIndexedSeq()
      .filter(child => childIds.has(child.id))
      .sortBy(child => child.name, lexComp);
  };
}

export { Sidebar, Props };
