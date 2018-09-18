import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";

import { CommonAttributes } from "common/types";

import { ErrorBoundary, ConnectedSheetView } from "components/molecules";

import "./Tabletop.scss";

interface Props extends CommonAttributes {
  sheetIds: Iterable<string>;
}

class Tabletop extends React.PureComponent<Props> {
  render() {
    const { className, sheetIds } = this.props;
    return (
      <div className={classNames("tabletop", className)}>
        {Seq.Indexed(sheetIds)
          .map(sheetId => (
            <ErrorBoundary key={sheetId}>
              <ConnectedSheetView sheetId={sheetId} />
            </ErrorBoundary>
          ))
          .toList()}
      </div>
    );
  }
}

export { Tabletop, Props };
