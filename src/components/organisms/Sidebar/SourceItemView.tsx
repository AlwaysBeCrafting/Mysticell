import classnames from "classnames";
import React from "react";
import { Icon } from "react-atoms";
import { Link } from "react-router-dom";

import { SourceType } from "data/Source";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";

interface Props {
  id: string;
  name: string;
  type: SourceType;
  selected?: boolean;
}

class SourceItemView extends React.PureComponent<Props> {
  render() {
    const { name, type, selected } = this.props;
    return (
      <div>
        <Link
          className={classnames("sidebar-item", {
            "is-selected": selected,
          })}
          to={`/`}
        >
          <Icon
            className={classnames("sidebar-item-icon", {
              "is-selected": selected,
            })}
            src={type === "property" ? propertyIcon : functionIcon}
          />
          <div className="sidebar-item-title">{name}</div>
        </Link>
      </div>
    );
  }
}

export { SourceItemView };
