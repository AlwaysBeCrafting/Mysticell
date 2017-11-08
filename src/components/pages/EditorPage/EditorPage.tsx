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
        <main className="editor">
          <div className="editor-document">
            <AppDragLayer />
            <Route exact path="/:path*" render={this.renderNavView} />
            <Route exact path="/" render={this.renderSheetView} />
            <Route exact path="/:path+" render={this.renderGraphView} />
          </div>
        </main>
      </Router>
    );
  }

  private renderNavView = (
    routeProps: RouteComponentProps<{ path: string }>,
  ) => (
    <PaletteView
      className="editor-document-nav"
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
          className="editor-document-content"
          path={segments}
          template={graphTemplate}
        />
      );
    } else {
      return (
        <div className="editor-document-error">
          No formula exists at /{routeProps.match.params.path}
        </div>
      );
    }
  };

  private renderSheetView = () => {
    return <SheetWrapper className="editor-document-content" />;
  };
}

const EditorPage = connect<StateProps, DispatchProps, {}>(
  (state: AppState) => ({
    title: state.document.title,
    sheets: state.document.sheets,
    palette: state.document.palette,
  }),
  (dispatch: Dispatch<Action>) => ({ dispatch }),
)(ProtoEditor);

export { EditorPage };
