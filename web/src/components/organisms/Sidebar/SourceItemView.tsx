import classNames from "classnames";
import React from "react";
import { Icon } from "react-atoms";
import { Route, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { SourceType } from "data/Source";

import { App } from "data/App";
import { connect } from "react-redux";
import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";
import { CommonAttributes } from "common/types";

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

interface OwnProps extends CommonAttributes {
  id: string;
  name: string;
  type: SourceType;
  selected?: boolean;
}

interface StateProps {
  path: string;
}

type Props = OwnProps & StateProps;

class PartialSourceItemView extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <Route path="/:documentId" render={this.renderLink} />
      </div>
    );
  }

  private renderLink = (routeProps: RouteProps) => {
    const { selected, type, name, path } = this.props;
    const { documentId } = routeProps.match.params;
    return (
      <Link
        className={classNames("Sidebar-item", {
          "is-selected": selected,
        })}
        to={`/${documentId}/${path}`}
      >
        <Icon
          className={classNames("Sidebar-item-icon", {
            "is-selected": selected,
          })}
          src={type === "property" ? propertyIcon : functionIcon}
        />
        <div className="Sidebar-item-title">{name}</div>
      </Link>
    );
  };
}

const mapStateToProps = (_: App, __: OwnProps): StateProps => ({
  path: "",
});

const SourceItemView = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialSourceItemView,
);

export { SourceItemView };
