import classnames from "classnames";
import React from "react";

import "./Icon.scss";

interface CommonProps {
  className?: string;
  size?: number;
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
const isNameProps = (props: Props): props is NameProps => (props as any).name;
const Icon = (props: Props) => {
  const className = classnames("icon", props.className);
  const style = { width: props.size, height: props.size, fontSize: props.size };
  return isNameProps(props) ? (
    <span className={className} style={style}>
      {props.name}
    </span>
  ) : (
    <img className={className} style={style} src={props.src} />
  );
};

export { Icon };
