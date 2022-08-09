/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const ThemesContext = React.createContext();

export class ThemesContextProvider extends React.Component {
  render() {
    return (
      <ThemesContext.Provider value={{ ...this.props.value }}>
        {this.props.children}
      </ThemesContext.Provider>
    );
  }
}
