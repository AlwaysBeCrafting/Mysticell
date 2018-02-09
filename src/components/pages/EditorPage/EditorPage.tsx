import { Map, Set } from "immutable";
import React from "react";
import { connect, MapStateToProps } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Dispatch } from "redux";

import {
  AppDragLayer,
  GraphView,
  NavView,
  SheetWrapper,
  StatusBar,
} from "components/organisms";

import { Action, AppState } from "data/AppState";
import { Nav, pathToNodePrototype } from "data/Nav";
import { isGraph, NodePrototype } from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./EditorPage.scss";

interface StateProps {
  title: string;
  nav: Nav;
  nodePrototypes: Map<string, NodePrototype>;
  sheets: Map<string, Sheet>;
  expandedNavItems: Set<string>;
  propertyCache: PropertyCache;
}
interface DispatchProps {
  dispatch: Dispatch<Action>;
}
type Props = StateProps & DispatchProps;

class ProtoEditor extends React.PureComponent<Props> {
  public render() {
    return (
      <Router>
        <main className="editor">
          <AppDragLayer />
          <Route exact path="/:path*" render={this.renderNavView} />
          <Route exact path="/" render={this.renderSheetView} />
          <Route exact path="/:path+" render={this.renderGraphView} />
          <Route exact path="/:path*" render={this.renderStatusBar} />
        </main>
      </Router>
    );
  }

  private renderNavView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => (
    <NavView
      className="editor-nav"
      nav={this.props.nav}
      nodePrototypes={this.props.nodePrototypes}
      expandedNavItems={this.props.expandedNavItems}
      selectedNavItem={`root/${routeProps.match.params.path}`}
    />
  );

  private renderGraphView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => {
    const segments = routeProps.match.params.path.split("/");
    const prototype = pathToNodePrototype(
      this.props.nodePrototypes,
      this.props.nav,
      segments,
    );
    if (prototype && isGraph(prototype)) {
      return (
        <GraphView
          className="editor-content"
          path={segments}
          prototype={prototype}
        />
      );
    } else {
      return (
        <div className="editor-error">
          No formula exists at /{routeProps.match.params.path}.<br />
          Prototype is {prototype}
        </div>
      );
    }
  };

  private renderSheetView = () => {
    return <SheetWrapper className="editor-content" />;
  };

  private renderStatusBar = () => {
    return <StatusBar className="editor-status" />;
  };
}

const mapStateToProps = (state: AppState) => ({
  title: state.document.title,
  nav: state.document.nav,
  nodePrototypes: state.document.nodePrototypes,
  sheets: state.document.sheets,
  expandedNavItems: state.uiState.expandedNavItems,
  propertyCache: state.propertyCache,
});

const EditorPage = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(ProtoEditor);

export { EditorPage };
