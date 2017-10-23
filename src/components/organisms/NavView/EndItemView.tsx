import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "components/atoms";

import { isProperty, NodePrototype } from "data/NodePrototype";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";

interface Props {
  prototype: NodePrototype;
  path: string[];
  selected?: boolean;
}

const EndItemView = (props: Props) => (
  <Link
    className={classnames("navView-item", {
      "is-selected": props.selected,
    })}
    to={`/${props.path.slice(1).join("/")}/${props.prototype.name}`}
  >
    <Icon
      className={classnames("navView-item-icon", {
        "is-selected": props.selected,
      })}
      src={isProperty(props.prototype) ? propertyIcon : functionIcon}
    />
    <div className="navView-item-title">{props.prototype.name}</div>
  </Link>
);

export { EndItemView };
