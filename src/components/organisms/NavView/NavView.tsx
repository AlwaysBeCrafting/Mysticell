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

import { Dict, DndTypes, isBranch } from "common/types";
import { collapse } from "common/utils";

import { TreeView } from "components/molecules";

import { Action } from "data/AppState";
import { NodeInfo } from "data/common";
import { Nav } from "data/Nav";
import { NodePrototype, removeNode } from "data/NodePrototype";
import { toggleNavItem } from "data/UiState";

import { DirItemView } from "components/organisms/NavView/DirItemView";
import { EndItemView } from "components/organisms/NavView/EndItemView";
import "./NavView.scss";

interface OwnProps {
  className?: string;
  nodePrototypes: Dict<NodePrototype>;
  nav: Nav;
  expandedNavItems: Set<string>;
  selectedNavItem: string;
}

interface DispatchProps {
  dispatch: Dispatch<Action>;
}

type StoreProps = OwnProps & DispatchProps;

interface DropProps {
  connectDropTarget: ConnectDropTarget;
}

type Props = StoreProps & DropProps;

const getItemKey = (tree: Nav) => tree.value;

class PartialNavView extends React.PureComponent<Props> {
  private collapsedNav: Nav;

  public componentWillMount() {
    this.collapsedNav = this.collapseNav(this.props);
  }

  public componentWillReceiveProps(nextProps: Props) {
    const { nav, expandedNavItems } = this.props;
    if (
      nav !== nextProps.nav ||
      expandedNavItems !== nextProps.expandedNavItems
    ) {
      this.collapsedNav = this.collapseNav(nextProps);
    }
  }

  public render() {
    const { connectDropTarget, className } = this.props;
    return connectDropTarget(
      <div className={classnames("navView", className)}>
        <TreeView
          className="navView-tree"
          tree={this.collapsedNav}
          getKey={getItemKey}
          renderItem={this.renderItem}
        />
      </div>,
    );
  }

  private renderItem = (tree: Nav, path: string[]) =>
    isBranch(tree) ? (
      <DirItemView
        name={tree.value}
        path={path}
        expanded={this.props.expandedNavItems.has(
          `${path.join("/")}/${tree.value}`,
        )}
        onClick={this.toggleBranchItemExpanded}
      />
    ) : (
      <EndItemView
        path={path}
        prototype={this.props.nodePrototypes[tree.value]}
        selected={
          this.props.selectedNavItem ===
          `${path.join("/")}/${this.props.nodePrototypes[tree.value].name}`
        }
      />
    );

  private collapseNav = (props: Props): Nav =>
    collapse(
      props.nav,
      (branch, path) =>
        branch === props.nav ||
        props.expandedNavItems.has(`${path.join("/")}/${branch.value}`),
    );

  private toggleBranchItemExpanded = (path: string) => {
    this.props.dispatch(toggleNavItem(path));
  };
}

const dropSpec: DropTargetSpec<StoreProps> = {
  drop: (props, monitor) => {
    const nodeInfo = monitor!.getItem() as NodeInfo;
    props.dispatch(removeNode(nodeInfo.parentId, nodeInfo.id));
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDropTarget: connect.dropTarget(),
});
const DropNavView = DropTarget(DndTypes.NODE, dropSpec, dropCollect)(
  PartialNavView,
);

const NavView = reduxConnect<{}, DispatchProps, OwnProps>(
  () => ({}),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(DropNavView);

export { NavView };
