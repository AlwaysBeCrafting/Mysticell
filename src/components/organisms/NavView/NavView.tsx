import classnames from "classnames";
import React from "react";
import { connect as reduxConnect } from "react-redux";
import { Dispatch } from "redux";

import { Dict, isBranch } from "common/types";
import { collapse } from "common/utils";

import { TreeView } from "components/molecules";

import { Action } from "data/AppState";
import { Nav } from "data/Nav";
import { NodePrototype } from "data/NodePrototype";
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

type Props = OwnProps & DispatchProps;

const getItemKey = (tree: Nav) => tree.value;

class ProtoNavView extends React.PureComponent<Props> {
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
    const props = this.props;
    return (
      <TreeView
        className={classnames("navView", props.className)}
        tree={this.collapsedNav}
        getKey={getItemKey}
        renderItem={this.renderItem}
      />
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

const NavView = reduxConnect<{}, DispatchProps, OwnProps>(
  () => ({}),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(ProtoNavView);

export { NavView };
