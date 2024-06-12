// src/components/ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    if (error.message.includes('Support for defaultProps will be removed')) {
      // Ignore the warning
      return;
    }
    console.error(error, info); // Log other errors
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
