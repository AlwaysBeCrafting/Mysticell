import classNames from "classnames";
import React from "react";

import "./StatusBar.scss";

interface Props {
  className?: string;
}

const StatusBar = (props: Props) => (
  <footer className={classNames("statusBar", props.className)}>
    <span className="statusBar-notice">
      Mysticell is a work in progress, and may change at any moment, right under
      your nose.
    </span>
    <a
      className="statusBar-link"
      href="http://github.com/AlwaysBeCrafting/Mysticell"
    >
      See the code
    </a>
  </footer>
);

export { StatusBar };
