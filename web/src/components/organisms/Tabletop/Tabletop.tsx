import classNames from "classnames";
import React, { useEffect } from "react";

import { CommonAttributes } from "common/types";

import { ConnectedSheetView } from "components/molecules";

import { EntityTable } from "data/common";
import { Sheet } from "data/Sheet";

import "./Tabletop.scss";

interface Props extends CommonAttributes {
  sheets: EntityTable<Sheet>;
  listSheets: () => void;
}

const Tabletop = (props: Props) => {
  const { className, sheets, listSheets } = props;

  useEffect(listSheets, []);

  return (
    <div className={classNames("tabletop", className)}>
      {sheets
        .toEntitySeq()
        .map(sheet => <ConnectedSheetView sheetId={sheet.id} key={sheet.id} />)
        .toList()}
    </div>
  );
};

export { Tabletop, Props };
