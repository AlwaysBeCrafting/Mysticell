import React from "react";

import { CommonAttributes } from "common/types";

import {
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
  documentId: string;
  path: string;
}

class DocumentPage extends React.PureComponent<Props> {
  render() {
    const { documentId, path } = this.props;
    console.log(this.props);
    return (
      <main className="DocumentPage">
        <ConnectedSidebar
          className="DocumentPage-sidebar"
          documentId={documentId}
        />
        {!path && (
          <ConnectedTabletop
            className="DocumentPage-content"
            documentId={documentId}
          />
        )}
        {path && this.renderFormulaView(path)}
        <StatusBar className="DocumentPage-status" />
      </main>
    );
  }

  private renderFormulaView = (path: string) => {
    const { idFromPath } = this.props;
    const pathFragments = path.split("/");
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
        <div className="DocumentPage-error">No formula exists at /{path}</div>
      );
    }
  };
}

export { DocumentPage, Props };
