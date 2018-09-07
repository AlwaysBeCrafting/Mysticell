import React from "react";
import { Link } from "react-router-dom";

import "./ToolButton.scss";

interface CommonProps {
  children?: React.ReactChild | React.ReactChild[];
  className?: string;
  enabled?: boolean;
  checkable?: boolean;
  checked?: boolean;
}
interface ButtonProps extends CommonProps {
  onClick: (ev: MouseEvent) => void;
  link?: undefined;
  to?: undefined;
}
interface LinkProps extends CommonProps {
  onClick?: undefined;
  link: boolean;
  to: string;
}
type Props = ButtonProps | LinkProps;
const isLinkProps = (props: Props): props is LinkProps => (props as any).link;
const ToolButton = (props: Props) =>
  isLinkProps(props) ? (
    <Link className="toolButton mod-link" to={props.to}>
      {props.children}
    </Link>
  ) : (
    <button className="toolButton">{props.children}</button>
  );

export { ToolButton };
