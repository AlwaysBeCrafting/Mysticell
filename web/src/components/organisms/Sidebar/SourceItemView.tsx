import classnames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { Route, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { bindPathFromId } from "data/EntityState";
import { SourceType } from "data/Source";

import { AppState } from "data/AppState";
import { connect } from "react-redux";
import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

interface OwnProps {
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
        className={classnames("sidebar-item", {
          "is-selected": selected,
        })}
        to={`/${documentId}/${path}`}
      >
        <Icon
          className={classnames("sidebar-item-icon", {
            "is-selected": selected,
          })}
          src={type === "property" ? propertyIcon : functionIcon}
        />
        <div className="sidebar-item-title">{name}</div>
      </Link>
    );
  };
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  path: Seq.Indexed(
    bindPathFromId(
      state.entities.directories.toSeq().concat(state.entities.sources),
      state.entities.entityParents,
    )(props.id) || [],
  ).join("/"),
});

const SourceItemView = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialSourceItemView,
);

export { SourceItemView };
