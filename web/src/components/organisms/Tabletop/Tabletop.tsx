import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "common/types";

import { ConnectedSheetView } from "components/molecules";

import { EntityTable } from "data/common";
import { Sheet } from "data/Sheet";

import "./Tabletop.scss";

interface Props extends CommonAttributes {
  sheets: EntityTable<Sheet>;
  listSheets: () => void;
}

class Tabletop extends React.PureComponent<Props> {
  componentDidMount() {
    const { listSheets } = this.props;
    listSheets();
  }

  render() {
    const { className, sheets } = this.props;
    return (
      <div className={classNames("tabletop", className)}>
        {sheets
          .toEntitySeq()
          .map(sheet => (
            <ConnectedSheetView sheetId={sheet.id} key={sheet.id} />
          ))
          .toList()}
      </div>
    );
  }
}

export { Tabletop, Props };
