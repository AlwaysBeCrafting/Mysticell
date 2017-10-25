import classnames from "classnames";
import React from "react";

import { Icon } from "components/atoms";

interface Props {
  expanded?: boolean;
  name: string;
  path: string[];
  onClick: (path: string) => void;
}

class DirItemView extends React.PureComponent<Props> {
  public render() {
    const { name, expanded } = this.props;
    return (
      <div className="navView-item" onClick={this.onClick}>
        <Icon
          className={classnames("navView-item-icon", "mod-dropdown", {
            "is-expanded": expanded,
          })}
          name="arrow_drop_down"
        />
        <span className="navView-item-title">{name}</span>
      </div>
    );
  }

  private onClick = (_: React.MouseEvent<HTMLDivElement>) => {
    this.props.onClick(`${this.props.path.join("/")}/${this.props.name}`);
  };
}

export { DirItemView };
