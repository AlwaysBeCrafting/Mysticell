import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import { CommonAttributes } from "common/types";

import {
  AppDragLayer,
  ConnectedFormulaView,
  ConnectedSidebar,
  StatusBar,
  ConnectedTabletop,
} from "components/organisms";

import { EntityTable } from "data/common";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";

import "./DocumentPage.scss";

interface Props extends CommonAttributes {
  name: string;
  sheets: EntityTable<Sheet>;
  sources: EntityTable<Source>;
  idFromPath: (path: Iterable<string>) => string | undefined;
}

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

class DocumentPage extends React.PureComponent<Props> {
  render() {
    return (
      <Router>
        <main className="DocumentPage">
          <AppDragLayer />
          <Route path="/:documentId" render={this.renderSidebar} />
          <Route exact path="/:documentId" render={this.renderTabletop} />
          <Route
            exact
            path="/:documentId/:path+"
            render={this.renderFormulaView}
          />
          <StatusBar className="DocumentPage-status" />
        </main>
      </Router>
    );
  }

  private renderSidebar = (routeProps: RouteProps) => (
    <ConnectedSidebar
      className="DocumentPage-sidebar"
      documentId={routeProps.match.params.documentId}
    />
  );

  private renderFormulaView = (routeProps: RouteProps) => {
    const { idFromPath } = this.props;
    const pathFragments = routeProps.match.params.path.split("/");
    const sourceId = idFromPath(pathFragments);
    if (sourceId) {
      return (
        <ConnectedFormulaView
          className="DocumentPage-content"
          sourceId={sourceId}
        />
      );
    } else {
      return (
        <div className="DocumentPage-error">
          No formula exists at /{routeProps.match.params.path}
        </div>
      );
    }
  };

  private renderTabletop = (routeProps: RouteProps) => {
    return (
      <ConnectedTabletop
        className="DocumentPage-content"
        documentId={routeProps.match.params.documentId}
      />
    );
  };
}

export { DocumentPage, Props };
