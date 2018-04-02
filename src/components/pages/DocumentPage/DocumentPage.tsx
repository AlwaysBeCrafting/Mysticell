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
  Palette,
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

type Props = StateProps;

class ProtoEditor extends React.PureComponent<Props> {
  render() {
    return (
      <Router>
        <main className="documentPage">
          <AppDragLayer />
          <Route exact path="/:path*" render={this.renderPalette} />
          <Route exact path="/" render={this.renderSheetView} />
          <Route exact path="/:path+" render={this.renderFormulaView} />
          <Route exact path="/:path*" render={this.renderStatusBar} />
        </main>
      </Router>
    );
  }

  private renderPalette = () => <Palette className="documentPage-palette" />;

  private renderFormulaView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => {
    const { idFromPath } = this.props;
    const sourceId = idFromPath(routeProps.match.path);
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

  private renderSheetView = () => {
    return <Tabletop className="documentPage-content" />;
  };

  private renderStatusBar = () => {
    return <StatusBar className="documentPage-status" />;
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
