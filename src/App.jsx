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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getCurrentTheme(),
    };
    this.changeTheme = this.changeTheme.bind(this);
  }
  getCurrentTheme() {
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      localStorage.setItem('theme', 'light');
      return currentTheme ?? 'light';
    }
    return currentTheme;
  }
  changeTheme(newTheme) {
    this.setState({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }
  render() {
    return (
      <ThemesContextProvider value={{ theme: this.state.theme, changeTheme: this.changeTheme }}>
        <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <RouterLayout />
          </I18nextProvider>
        </ErrorBoundary>
      </ThemesContextProvider>

    );
  }
}
App.contextType = ThemesContext;
export default App;
