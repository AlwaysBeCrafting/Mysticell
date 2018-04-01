import classnames from "classnames";
import React from "react";
import { connect as reduxConnect } from "react-redux";

import { TreeView } from "components/molecules";

import { AppState } from "data/AppState";
import { EntityTable, JoinManyToOne } from "data/common";
import { Directory } from "data/Directory";
import { Source } from "data/Source";

import { DirectoryItemView } from "./DirectoryItemView";
import { SourceItemView } from "./SourceItemView";

import "./Palette.scss";

const lexComp = (a: string, b: string) => a.localeCompare(b);

interface OwnProps {
  className?: string;
}

interface StateProps {
  directories: EntityTable<Directory>;
  sources: EntityTable<Source>;
  entityParents: JoinManyToOne;
}

type Props = OwnProps & StateProps;

class PartialPalette extends React.PureComponent<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames("paletteView", className)}>
        <TreeView
          className="paletteView-tree"
          render={this.renderItem}
          getKey={this.getItemKey}
          getChildren={this.getItemChildren}
        />
      </div>
    );
  }

  private renderItem = (item: Directory | Source) => {
    const {} = this.props;
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

  private getItemChildren = (item: Directory | Source) => {
    const { directories, sources, entityParents } = this.props;
    const childIds = entityParents.filter(parentId => parentId === item.id);

    const childDirectories = directories
      .toIndexedSeq()
      .filter(directory => childIds.has(directory.id))
      .sortBy(d => d.name, lexComp);

    const childSources = sources
      .toIndexedSeq()
      .filter(source => childIds.has(source.id))
      .sortBy(d => d.name, lexComp);

    return childDirectories.concat(childSources);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  directories: state.entities.directories,
  sources: state.entities.sources,
  entityParents: state.entities.entityParents,
});

const Palette = reduxConnect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialPalette,
);

export { Palette };
