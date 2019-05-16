import classNames from "classnames";
import React from "react";

import "./Card.scss";
import { CommonAttributes, ParentAttributes } from "~/common/types";

interface Props extends CommonAttributes, ParentAttributes {}

const Card = ({ className, children }: Props) => (
  <div className={classNames("Card", className)}>{children}</div>
);

export { Card };
