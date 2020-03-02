import React from "react";
import ErrorIndicator from "../Error-indicator";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  render() {
    return this.state.hasError ? <ErrorIndicator /> : this.props.children;
  }
}

export default ErrorBoundary;
