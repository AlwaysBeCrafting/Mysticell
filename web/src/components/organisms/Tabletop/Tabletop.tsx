import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";

import { CommonAttributes } from "common/types";

import { ConnectedSheetView } from "components/molecules";

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
          .map(sheetId => <ConnectedSheetView sheetId={sheetId} />)
          .toList()}
      </div>
    );
  }
}

export { Tabletop, Props };
