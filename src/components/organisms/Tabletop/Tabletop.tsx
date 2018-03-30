import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { ErrorBoundary } from "components/molecules";

import { AppState } from "data/AppState";
import { EntityTable } from "data/common";
import { Sheet } from "data/Sheet";

import "./Tabletop.scss";

interface OwnProps {
  className?: string;
}

interface StateProps {
  sheets: EntityTable<Sheet>;
}

type Props = OwnProps & StateProps;

// FIXME This gets its own organism
const SheetView = () => <div className="dummySheet" />;

class PartialTabletop extends React.PureComponent<Props> {
  render() {
    const { className, sheets } = this.props;
    return (
      <div className={classNames("sheetWrapper", className)}>
        {sheets
          .map(sheet => (
            <ErrorBoundary key={sheet.id}>
              <SheetView />
            </ErrorBoundary>
          ))
          .toList()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  sheets: state.entities.sheets,
});

const SheetWrapper = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
  dispatch => ({ dispatch }),
)(PartialTabletop);

export { SheetWrapper };
