/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import './scss/app.scss';

import RouterLayout from './layouts/RouterLayout';
import ErrorBoundary from './layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import { ThemesContext, ThemesContextProvider } from 'themes/ThemeContextProvider';
import { SSOContextProvider } from 'aesirx-sso';
import 'aesirx-dam-app/dist/index.css';
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemesContextProvider>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <SSOContextProvider>
              <RouterLayout />
            </SSOContextProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </ThemesContextProvider>
    );
  }
}
App.contextType = ThemesContext;
export default App;
