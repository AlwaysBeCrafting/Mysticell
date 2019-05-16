import React, { useEffect } from "react";
import useReactRouter from "use-react-router";

import { CommonAttributes } from "~/common/types";
import {
  FormulaView,
  Sidebar,
  StatusBar,
  Tabletop,
} from "~/components/organisms";
import { useDocument } from "~/data/Document";

import "./DocumentPage.scss";

interface Props extends CommonAttributes {
  idFromPath: (path: Iterable<string>) => string | undefined;
  documentId: string;
  path: string;
}

const DocumentPage = (props: Props) => {
  const { idFromPath, path } = props;

  const { match } = useReactRouter<{ documentId: string }>();
  const { documentId } = match.params;

  const [, { fetch }] = useDocument(documentId);
  useEffect(() => {
    fetch();
  }, []);

  const renderFormulaView = (path: string) => {
    const pathFragments = path.split("/");
    const sourceId = idFromPath(pathFragments);
    if (sourceId) {
      return (
        <FormulaView
          className="DocumentPage-content"
          documentId={documentId}
          formulaId={sourceId}
          path="/"
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
      <Sidebar className="DocumentPage-sidebar" documentId={documentId} />
      {path ? (
        renderFormulaView(path)
      ) : (
        <Tabletop className="DocumentPage-content" documentId={documentId} />
      )}
      <StatusBar className="DocumentPage-status" />
    </main>
  );
};

export { DocumentPage, Props };
