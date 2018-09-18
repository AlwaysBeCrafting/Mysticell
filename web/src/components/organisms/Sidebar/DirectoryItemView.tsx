import classnames from "classnames";
import React from "react";
import { Icon } from "react-atoms";

interface Props {
  expanded?: boolean;
  name: string;
}

class DirectoryItemView extends React.PureComponent<Props> {
  render() {
    const { name, expanded } = this.props;
    return (
      <div className="Sidebar-item">
        <Icon
          className={classnames("Sidebar-item-icon", "mod-dropdown", {
            "is-expanded": expanded,
          })}
          name="arrow_drop_down"
        />
        <span className="Sidebar-item-title">{name}</span>
      </div>
    );
  }
}

export { DirectoryItemView };
