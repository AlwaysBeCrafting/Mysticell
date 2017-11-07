import classnames from "classnames";
import React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from "react-dnd";
import { connect as reduxConnect } from "react-redux";
import { Dispatch } from "redux";

import { DndTypes } from "common/types";

import { TreeView } from "components/molecules";

import { Action } from "data/AppState";
import { CardSnapshot } from "data/Card";
import { removeCard } from "data/CardTemplate";
import { Palette, TemplatePath, toggleItem } from "data/Palette";

import { DirItemView } from "./DirItemView";
import { EndItemView } from "./EndItemView";
import "./PaletteView.scss";

interface OwnProps {
  className?: string;
  palette: Palette;
  currentPath: string[];
}

interface DispatchProps {
  dispatch: Dispatch<Action>;
}

type StoreProps = OwnProps & DispatchProps;

interface DropProps {
  connectDropTarget: ConnectDropTarget;
}

type Props = StoreProps & DropProps;

class PartialNavView extends React.PureComponent<Props> {
  render() {
    const { connectDropTarget, className } = this.props;
    return connectDropTarget(
      <div className={classnames("navView", className)}>
        <TreeView
          className="navView-tree"
          renderItem={this.renderItem}
          getItemKey={this.getItemKey}
          getChildren={this.getChildren}
        />
      </div>,
    );
  }

  private renderItem = (path: TemplatePath) => {
    const item = path[path.length - 1];
    if (item.type === "group") {
      return (
        <DirItemView
          name={item.name}
          path={path}
          expanded
          onClick={this.toggleItemExpanded}
        />
      );
    } else {
      return (
        <EndItemView
          path={path}
          template={this.props.palette.getTemplate(item.template)!}
          selected={
            this.props.currentPath.join("/") ===
            `${path.join("/")}/${this.props.palette.getTemplate(item.template)!
              .name}`
          }
        />
      );
    }
  };

  private getItemKey = (path: TemplatePath) => {
    // tslint:disable:no-console
    console.log(this.props.palette.documentTree);
    console.log(path);
    return `${path[path.length - 1].hashCode()}`;
  };

  private getChildren = (path: TemplatePath) => {
    const subtree = this.props.palette.documentTree.getSubtree(path);
    if (subtree) {
      return subtree.children.keySeq().toArray();
    } else {
      return [];
    }
  };

  private toggleItemExpanded = (path: TemplatePath) => {
    this.props.dispatch(toggleItem(path));
  };
}

const dropSpec: DropTargetSpec<StoreProps> = {
  drop: (props, monitor) => {
    const snapshot = monitor!.getItem() as CardSnapshot;
    props.dispatch(removeCard(snapshot.template, snapshot.id));
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDropTarget: connect.dropTarget(),
});
const DropNavView = DropTarget(DndTypes.CARD, dropSpec, dropCollect)(
  PartialNavView,
);

const PaletteView = reduxConnect<{}, DispatchProps, OwnProps>(
  () => ({}),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(DropNavView);

export { PaletteView };
