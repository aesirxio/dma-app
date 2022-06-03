/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import SelectComponent from '../Select';

class SelectComponentAds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, getValueSelected, getDataSelectOptions, handleChange } = this.props;

    return (
      <div className="border-start-5 bg-white p-2 px-3 mb-3 rounded-2 mt-3">
        {title && <p className="text-blue-0 opacity-75 mb-2 fs-5">{title}</p>}

        <SelectComponent
          value={getValueSelected}
          options={getDataSelectOptions}
          className="mb-3 text-danger"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          isMulti={true}
          onChange={handleChange}
        />
      </div>
    );
  }
}

export default SelectComponentAds;
