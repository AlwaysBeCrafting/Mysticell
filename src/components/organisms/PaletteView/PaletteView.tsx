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
import { Palette, PaletteNode, TemplatePath, toggleItem } from "data/Palette";

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

class PartialPaletteView extends React.PureComponent<Props> {
  render() {
    const { connectDropTarget, className } = this.props;
    return connectDropTarget(
      <div className={classnames("paletteView", className)}>
        <TreeView
          className="paletteView-tree"
          tree={this.props.palette.documentTree}
          renderItem={this.renderItem}
          getItemKey={this.getItemKey}
          shouldRenderChildren={this.shouldRenderChildren}
        />
      </div>,
    );
  }

  private renderItem = (item: PaletteNode, path: TemplatePath) => {
    if (item.type === "group") {
      return (
        <DirItemView
          name={item.name}
          path={path}
          expanded={item.isExpanded}
          onClick={this.toggleItemExpanded}
        />
      );
    } else {
      const template = this.props.palette.getTemplate(item.template);
      if (!template) {
        return null;
      }
      return (
        <EndItemView
          path={path}
          template={template}
          selected={
            this.props.currentPath.join("/") ===
            `${path.join("/")}/${template && template.name}`
          }
        />
      );
    }
  };

  private getItemKey = (item: PaletteNode) => {
    return `${item.hashCode()}`;
  };

  private shouldRenderChildren = (item: PaletteNode): boolean => {
    return !!item && item.type === "group" && item.isExpanded;
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
const DropPaletteView = DropTarget(DndTypes.CARD, dropSpec, dropCollect)(
  PartialPaletteView,
);

const PaletteView = reduxConnect<{}, DispatchProps, OwnProps>(
  () => ({}),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(DropPaletteView);

export { PaletteView };
