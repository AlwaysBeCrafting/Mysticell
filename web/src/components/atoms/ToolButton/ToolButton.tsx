import classNames from "classnames";
import React, { HTMLProps } from "react";
import { Link } from "react-router-dom";

import "./ToolButton.scss";
import { CommonAttributes, ParentAttributes } from "common/types";

interface CommonProps extends CommonAttributes, ParentAttributes {
  enabled?: boolean;
  checkable?: boolean;
  checked?: boolean;
}

interface ButtonProps extends CommonProps {
  onClick?: HTMLProps<HTMLButtonElement>["onClick"];
  to?: undefined;
}

interface LinkProps extends CommonProps {
  onClick?: undefined;
  to: string;
}

type Props = ButtonProps | LinkProps;

const isLinkProps = (props: Props): props is LinkProps => !!props.to;

const ToolButton = (props: Props) => {
  if (isLinkProps(props)) {
    const { className, children, to } = props;
    return (
      <Link className={classNames("ToolButton mod-link", className)} to={to}>
        {children}
      </Link>
    );
  } else {
    const { className, children, onClick } = props;
    return (
      <button
        className={classNames("ToolButton mod-action", className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export { ToolButton };
