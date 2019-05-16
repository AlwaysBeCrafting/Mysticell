import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "~/common/types";

import "./Icon.scss";

interface IconCommonAttributes extends CommonAttributes {}

interface IconNameAttributes extends IconCommonAttributes {
  name: string;
  src?: undefined;
}

interface IconSrcAttributes extends IconCommonAttributes {
  name?: undefined;
  src: string;
}

const Icon = (props: IconNameAttributes | IconSrcAttributes) => {
  const className = classNames("Icon", props.className);
  if (typeof props.name === "undefined") {
    return <img className={className} style={props.style} src={props.src} />;
  } else {
    return (
      <span className={className} style={props.style}>
        {props.name}
      </span>
    );
  }
};

export { Icon };
