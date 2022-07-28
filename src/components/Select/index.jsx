/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import { ThemesContext } from 'themes/ThemeContextProvider';

class SelectComponent extends React.Component {
  render() {
    const { theme } = this.context;
    let { isBorder, plColor, async } = this.props;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    let styles = customStyles(isBorder, plColor);

    if (async) {
      return <AsyncSelect {...this.props} styles={styles} />;
    }

    return <Select {...this.props} styles={styles} />;
  }
}

SelectComponent.defaultProps = {
  async: false,
  isMulti: false,
};
SelectComponent.contextType = ThemesContext;
export default SelectComponent;
