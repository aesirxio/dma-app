/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { PureComponent } from 'react';
import './index.scss';

class ComponentSwitch extends PureComponent {
  render() {
    let { handleChange, checked, text, id, textLeft } = this.props;
    return (
      <div className="form-check form-switch d-none d-md-block">
        {textLeft && (
          <label className="form-check-label me-2 text-nowrap" htmlFor={id}>
            {textLeft}
          </label>
        )}

        <input
          className="form-check-input w-98"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        {text && (
          <label className="form-check-label" htmlFor={id}>
            {text}
          </label>
        )}
      </div>
    );
  }
}

export default ComponentSwitch;
