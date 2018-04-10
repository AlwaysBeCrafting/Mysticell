import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { ErrorBoundary, SheetView } from "components/molecules";

import { AppState } from "data/AppState";

import "./Tabletop.scss";

interface OwnProps {
  className?: string;
  documentId: string;
}

interface StateProps {
  sheetIds: Iterable<string>;
}

type Props = OwnProps & StateProps;

class PartialTabletop extends React.PureComponent<Props> {
  render() {
    const { className, sheetIds } = this.props;
    return (
      <div className={classNames("tabletop", className)}>
        {Seq.Indexed(sheetIds)
          .map(sheetId => (
            <ErrorBoundary key={sheetId}>
              <SheetView sheetId={sheetId} />
            </ErrorBoundary>
          ))
          .toList()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  sheetIds: state.entities.sheetDocuments
    .filter(documentId => documentId === props.documentId)
    .keySeq(),
});

const Tabletop = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
  dispatch => ({ dispatch }),
)(PartialTabletop);

export { Tabletop };
