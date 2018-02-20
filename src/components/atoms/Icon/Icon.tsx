import classnames from "classnames";
import React from "react";

import "./Icon.scss";

interface CommonProps {
  className?: string;
}

interface NameProps extends CommonProps {
  name: string;
  src?: undefined;
}

interface SrcProps extends CommonProps {
  name?: undefined;
  src: string;
}

type Props = NameProps | SrcProps;

const Icon = (props: Props) => {
  const className = classnames("icon", props.className);
  if (typeof props.name === "undefined") {
    return <img className={className} src={props.src} />;
  } else {
    return <span className={className}>{props.name}</span>;
  }
};

export { Icon };
