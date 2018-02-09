import classNames from "classnames";
import React from "react";

import "./StatusBar.scss";

interface Props {
  className?: string;
}

const StatusBar = (props: Props) => (
  <footer className={classNames("statusBar", props.className)}>
    Status bar
  </footer>
);

export { StatusBar };
