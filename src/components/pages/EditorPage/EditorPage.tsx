import { Map } from "immutable";
import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Dispatch } from "redux";

import {
  AppDragLayer,
  GraphView,
  PaletteView,
  SheetWrapper,
  StatusBar,
} from "components/organisms";

import { Action, AppState } from "data/AppState";
import { Palette } from "data/Palette";
import { Sheet } from "data/Sheet";

import "./EditorPage.scss";

interface StateProps {
  title: string;
  sheets: Map<string, Sheet>;
  palette: Palette;
}
interface DispatchProps {
  dispatch: Dispatch<Action>;
}
type Props = StateProps & DispatchProps;

class ProtoEditor extends React.PureComponent<Props> {
  render() {
    return (
      <Router>
        <main className="editorPage">
          <AppDragLayer />
          <Route exact path="/:path*" render={this.renderPaletteView} />
          <Route exact path="/" render={this.renderSheetView} />
          <Route exact path="/:path+" render={this.renderGraphView} />
          <Route exact path="/:path*" render={this.renderStatusBar} />
        </main>
      </Router>
    );
  }

  private renderPaletteView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => (
    <PaletteView
      className="editorPage-palette"
      palette={this.props.palette}
      currentPath={(routeProps.match.params.path || "").split("/")}
    />
  );

  private renderGraphView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => {
    const { palette } = this.props;
    const segments = routeProps.match.params.path.split("/");
    const templateId = palette.idFromPath(segments);
    const graphTemplate = palette.getGraph(templateId || "");
    if (graphTemplate) {
      return (
        <GraphView
          className="editorPage-content"
          path={segments}
          template={graphTemplate}
        />
      );
    } else {
      return (
        <div className="editorPage-error">
          No formula exists at /{routeProps.match.params.path}
        </div>
      );
    }
  };

  private renderSheetView = () => {
    return <SheetWrapper className="editorPage-content" />;
  };

  private renderStatusBar = () => {
    return <StatusBar className="editorPage-status" />;
  };
}

const EditorPage = connect<StateProps, DispatchProps, {}, AppState>(
  (state: AppState) => ({
    title: state.document.title,
    sheets: state.document.sheets,
    palette: state.document.palette,
  }),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(ProtoEditor);

export { EditorPage };
