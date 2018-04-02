import classNames from "classnames";
import React from "react";

import { ParamType } from "data/common";

import "./Pin.scss";

interface Props {
  className?: string;
  type: ParamType;
}

const Pin = (props: Props) => {
  const { className, type } = props;
  return <div className={classNames(className, "pin", `mod-${type}`)} />;
};

export { Pin };
