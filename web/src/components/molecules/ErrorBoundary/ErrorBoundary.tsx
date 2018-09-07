import React from "react";

import "./ErrorBoundary.scss";

interface Props {
  children: JSX.Element;
}
interface State {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="errorBoundary">
          <h1 className="errorBoundary-heading">Uh-oh</h1>
          <div className="errorBoundary-error">
            {this.state.error && this.state.error.toString()}
          </div>
          <div className="errorBoundary-info">
            {this.state.errorInfo.componentStack}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
