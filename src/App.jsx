/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

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
