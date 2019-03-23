import { connect, Dispatch } from "react-redux";

import { App } from "data/App";

import { HomePage, Props } from "./HomePage";
import { listDocuments } from "data/Document";

type StateProps = Pick<Props, "documents">;
type DispatchProps = Pick<Props, "listDocuments">;

const mapStateToProps = ({ documents }: App): StateProps => ({ documents });

const mapDispatchToProps = (dispatch: Dispatch<App>): DispatchProps => ({
  listDocuments: () => dispatch(listDocuments()),
});

const ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export { ConnectedHomePage };
