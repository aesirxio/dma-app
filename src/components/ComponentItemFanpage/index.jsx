/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import Checkbox from '../Checkbox';
import ComponentImage from '../ComponentImage';

class ComponentItemFanpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, handleCheckbox } = this.props;
    return (
      <li className="d-flex align-items-center justify-content-between w-100 mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <ComponentImage src="/assets/images/ic-facebook.svg" alt="icon facebook" />
          <p className="mb-0">{name}</p>
        </div>
        <div onClick={handleCheckbox}>
          <Checkbox />
        </div>
      </li>
    );
  }
}

export default ComponentItemFanpage;
