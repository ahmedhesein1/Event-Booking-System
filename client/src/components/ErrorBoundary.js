// src/components/ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
