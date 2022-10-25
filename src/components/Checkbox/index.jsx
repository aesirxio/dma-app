/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import './index.scss';
import { withTranslation } from 'react-i18next';

class Checkbox extends React.Component {
  render() {
    let { name, text, checked, onCheckBoxChange, disabled } = this.props;
    const { t } = this.props;
    return (
      <div className="form-check">
        <input
          name={name}
          id={`id_${name}`}
          className="form-check-input cursor-pointer"
          type="checkbox"
          checked={checked}
          onChange={onCheckBoxChange}
          disabled={disabled}
        />
        <label className="form-check-label cursor-pointer" htmlFor={`id_${name}`}>
          {t(text)}
        </label>
      </div>
    );
  }
}

export default withTranslation('common')(Checkbox);
