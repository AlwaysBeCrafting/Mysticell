import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import {
  AppDragLayer,
  FormulaView,
  Sidebar,
  StatusBar,
  Tabletop,
} from "components/organisms";

import { AppState } from "data/AppState";
import { EntityTable } from "data/common";
import { Document } from "data/Document";
import { bindIdFromPath } from "data/EntityState";
import { Sheet } from "data/Sheet";
import { Source } from "data/Source";

import "./DocumentPage.scss";

interface OwnProps {
  documentId: string;
}

interface StateProps {
  name: string;
  sheets: EntityTable<Sheet>;
  sources: EntityTable<Source>;
  idFromPath: (path: Iterable<string>) => string | undefined;
}

type Props = StateProps & OwnProps;

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

class ProtoEditor extends React.PureComponent<Props> {
  render() {
    return (
      <Router>
        <main className="documentPage">
          <AppDragLayer />
          <Route path="/:documentId" render={this.renderSidebar} />
          <Route exact path="/:documentId" render={this.renderTabletop} />
          <Route
            exact
            path="/:documentId/:path+"
            render={this.renderFormulaView}
          />
          <StatusBar className="documentPage-status" />
        </main>
      </Router>
    );
  }

  private renderSidebar = (routeProps: RouteProps) => (
    <Sidebar
      className="documentPage-sidebar"
      documentId={routeProps.match.params.documentId}
    />
  );

  private renderFormulaView = (routeProps: RouteProps) => {
    const { idFromPath } = this.props;
    const pathFragments = routeProps.match.params.path.split("/");
    const sourceId = idFromPath(pathFragments);
    if (sourceId) {
      return (
        <FormulaView className="documentPage-content" sourceId={sourceId} />
      );
    } else {
      return (
        <div className="documentPage-error">
          No formula exists at /{routeProps.match.params.path}
        </div>
      );
    }
  };

  private renderTabletop = (routeProps: RouteProps) => {
    return (
      <Tabletop
        className="documentPage-content"
        documentId={routeProps.match.params.documentId}
      />
    );
  };
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  name: state.entities.documents.get(props.documentId, new Document()).name,
  sheets: state.entities.sheets,
  sources: state.entities.sources,
  /* TODO I think this will cause a lot of useless re-renders??? */
  idFromPath: bindIdFromPath(
    state.entities.directories.toSeq().concat(state.entities.sources),
    state.entities.entityParents,
  ),
});

const DocumentPage = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  ProtoEditor,
);

export { DocumentPage };
