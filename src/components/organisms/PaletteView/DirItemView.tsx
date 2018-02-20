import classnames from "classnames";
import React from "react";

import { Icon } from "components/atoms";
import { TemplatePath } from "data/Palette";

interface Props {
  expanded?: boolean;
  name: string;
  path: TemplatePath;
  onClick: (path: TemplatePath) => void;
}

class DirItemView extends React.PureComponent<Props> {
  render() {
    const { name, expanded } = this.props;
    return (
      <div className="paletteView-item" onClick={this.onClick}>
        <Icon
          className={classnames("paletteView-item-icon", "mod-dropdown", {
            "is-expanded": expanded,
          })}
          name="arrow_drop_down"
        />
        <span className="paletteView-item-title">{name}</span>
      </div>
    );
  }

  private onClick = (_: React.MouseEvent<HTMLDivElement>) => {
    this.props.onClick(this.props.path);
  };
}

export { DirItemView };
