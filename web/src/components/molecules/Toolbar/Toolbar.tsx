import classNames from "classnames";
import React from "react";

import { CommonAttributes, ParentAttributes } from "~/common/types";

import "./Toolbar.scss";

interface Props extends CommonAttributes, ParentAttributes {}

const Toolbar = (props: Props) => (
  <menu type="Toolbar" className={classNames("Toolbar", props.className)}>
    {props.children}
  </menu>
);

export { Toolbar };
