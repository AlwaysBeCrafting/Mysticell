import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import "./ToolButton.scss";
import { CommonAttributes, ParentAttributes } from "common/types";

interface CommonProps extends CommonAttributes, ParentAttributes {
  enabled?: boolean;
  checkable?: boolean;
  checked?: boolean;
}

interface ButtonProps extends CommonProps {
  onClick?: (ev: MouseEvent) => void;
  to?: undefined;
}

interface LinkProps extends CommonProps {
  onClick?: undefined;
  to: string;
}

type Props = ButtonProps | LinkProps;

const isLinkProps = (props: Props): props is LinkProps => !!props.to;

const ToolButton = (props: Props) =>
  isLinkProps(props) ? (
    <Link
      className={classNames("ToolButton mod-link", props.className)}
      to={props.to}
    >
      {props.children}
    </Link>
  ) : (
    <button className={classNames("ToolButton", props.className)}>
      {props.children}
    </button>
  );

export { ToolButton };
