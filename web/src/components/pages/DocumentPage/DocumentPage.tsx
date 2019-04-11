import React, { useEffect } from "react";

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
  getDocument: () => void;
}

const DocumentPage = (props: Props) => {
  const { documentId, idFromPath, path, getDocument } = props;

  useEffect(getDocument, []);

  const renderFormulaView = (path: string) => {
    const pathFragments = path.split("/");
    const sourceId = idFromPath(pathFragments);
    if (sourceId) {
      return (
        <ConnectedFormulaView
          className="DocumentPage-content"
          documentId={documentId}
          sourceId={sourceId}
        />
      );
    } else {
      return (
        <div className="DocumentPage-error">No formula exists at /{path}</div>
      );
    }
  };

  return (
    <main className="DocumentPage">
      <ConnectedSidebar
        className="DocumentPage-sidebar"
        documentId={documentId}
      />
      {path ? (
        renderFormulaView(path)
      ) : (
        <ConnectedTabletop
          className="DocumentPage-content"
          documentId={documentId}
        />
      )}
      <StatusBar className="DocumentPage-status" />
    </main>
  );
};

export { DocumentPage, Props };
