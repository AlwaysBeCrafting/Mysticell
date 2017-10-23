import classNames from "classnames";
import React from "react";

import { Param } from "data/common";

import "./Pin.scss";

interface CommonProps {
  name: string;
  className?: string;
  takesInput?: boolean;
  canConnect?: boolean;
  userValue?: string;
  onChange?: (index: number, value: string) => void;
  index: number;
  param?: Param;
}

interface SrcProps extends CommonProps {
  source: true;
  target?: undefined;
}

interface DstProps extends CommonProps {
  source?: undefined;
  target: true;
}

type Props = SrcProps | DstProps;

class Pin extends React.PureComponent<Props> {
  public render() {
    const { className, name, source, target, canConnect } = this.props;
    const classMod = {
      "mod-source": source,
      "mod-target": target,
    };
    return (
      <div className={classNames("pin", className, classMod)} key={name}>
        {(typeof canConnect === "undefined" || canConnect) && (
          <div className={classNames("pin-dot", classMod)} />
        )}
        <label className={classNames("pin-label", classMod)}>{name}</label>
        {this.renderInputValue(classNames("pin-value", classMod))}
        {this.renderReadOnlyValue(classNames("pin-value", classMod))}
      </div>
    );
  }

  private renderInputValue(className: string) {
    if (this.props.takesInput) {
      return (
        <input
          className={className}
          defaultValue={this.props.userValue}
          onChange={this.onChange}
        />
      );
    }
    return null;
  }

  private renderReadOnlyValue(className: string) {
    if (!this.props.takesInput && this.props.param) {
      return (
        <div className={classNames(className, "mod-readonly")}>
          {this.props.param.value}
        </div>
      );
    }
    return null;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.index, event.currentTarget.value);
    }
  };
}

export { Pin };
