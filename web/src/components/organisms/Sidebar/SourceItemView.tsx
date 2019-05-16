import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "~/components/atoms";
import { useSource } from "~/data/Source";

import functionIcon from "./assets/icon-function.svg";
import fieldIcon from "./assets/icon-property.svg";
import { CommonAttributes } from "~/common/types";

interface Props extends CommonAttributes {
  documentId: string;
  sourceId: string;
  selected?: boolean;
}

const SourceItemView = (props: Props) => {
  const { documentId, sourceId, selected } = props;
  const [source] = useSource(sourceId);
  return (
    <Link
      className={classNames("Sidebar-item", {
        "is-selected": selected,
      })}
      to={`/${documentId}${source.path}`}
    >
      <Icon
        className={classNames("Sidebar-item-icon", {
          "is-selected": selected,
        })}
        src={source.type === "field" ? fieldIcon : functionIcon}
      />
      <div className="Sidebar-item-title">{name}</div>
    </Link>
  );
};

export { SourceItemView };
