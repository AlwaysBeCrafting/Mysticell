import classNames from "classnames";
import React from "react";

import "./Toolbar.scss";

interface Props {
  children?: {};
  className?: string;
}
const Toolbar = (props: Props) => (
  <menu type="Toolbar" className={classNames("Toolbar", props.className)}>
    {props.children}
  </menu>
);

export { Toolbar };
