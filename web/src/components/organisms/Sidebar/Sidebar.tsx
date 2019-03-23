import classnames from "classnames";
import React from "react";
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

class Sidebar extends React.PureComponent<Props> {
  componentDidMount() {
    const { listSources } = this.props;
    listSources();
  }

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

  private renderItem = (item: Source) => {
    // TODO Show as selected when the current route points to its path
    return (
      <SourceItemView
        id={item.id}
        name={item.path}
        type={(item as Source).type}
        selected={false}
      />
    );
  };

  private getItemKey = (item: Source) => item.id;

  private getItemChildren = (item?: Source) =>
    item ? [] : this.props.sources.entities.toList();
}

export { Sidebar, Props };
