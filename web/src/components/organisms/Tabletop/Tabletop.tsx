import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "~/common/types";
import { SheetView } from "~/components/molecules";
import { useSheetList } from "~/data/Sheet";

import "./Tabletop.scss";

interface Props extends CommonAttributes {
  documentId: string;
}

const Tabletop = (props: Props) => {
  const { className, documentId } = props;

  const [sheets] = useSheetList(documentId);

  return (
    <div className={classNames("tabletop", className)}>
      {sheets.toIndexedSeq().map(sheetId => (
        <SheetView sheetId={sheetId} key={sheetId} />
      ))}
    </div>
  );
};

export { Tabletop };
