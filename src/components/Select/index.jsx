/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import { ThemesContext } from 'themes/ThemeContextProvider';
import { withTranslation } from 'react-i18next';

class SelectComponent extends React.Component {
  render() {
    const { t } = this.props;
    const { theme } = this.context;
    let { isBorder, plColor, async, placeholder } = this.props;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    let styles = customStyles(isBorder, plColor);

    if (async) {
      return (
        <AsyncSelect
          {...this.props}
          placeholder={placeholder ?? t('txt_select...')}
          styles={styles}
        />
      );
    }

    return (
      <Select {...this.props} placeholder={placeholder ?? t('txt_select...')} styles={styles} />
    );
  }
}

SelectComponent.defaultProps = {
  async: false,
  isMulti: false,
};
SelectComponent.contextType = ThemesContext;
export default withTranslation('common')(SelectComponent);
