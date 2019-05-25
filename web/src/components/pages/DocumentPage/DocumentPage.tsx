import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import useReactRouter from "use-react-router";

import { CommonAttributes } from "~/common/types";
import { Sidebar, StatusBar, Tabletop } from "~/components/organisms";
import { useDocument } from "~/data/Document";

import "./DocumentPage.scss";

interface Props extends CommonAttributes {}

const DocumentPage = (props: Props) => {
  const { match } = useReactRouter<{ documentId: string }>();
  const { documentId } = match.params;

  const [, { fetch }] = useDocument(documentId);
  useEffect(() => {
    fetch();
  }, [documentId]);

  return (
    <main className="DocumentPage">
      <Sidebar className="DocumentPage-sidebar" documentId={documentId} />
      <Switch>
        <Route>
          <Tabletop className="DocumentPage-tabletop" documentId={documentId} />
        </Route>
      </Switch>
      <StatusBar className="DocumentPage-status" />
    </main>
  );
};

export { DocumentPage };
