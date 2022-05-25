import React from 'react';

import './scss/app.scss';

import RouterLayout from './layouts/RouterLayout';
import ErrorBoundary from './layouts/ErrorBoundary';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <RouterLayout />
      </ErrorBoundary>
    );
  }
}

export default App;
