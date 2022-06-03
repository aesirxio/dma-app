/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import ComponentImage from '../ComponentImage';
import './index.scss';

class ComponentPersonaTemplate extends Component {
  render() {
    const { handlerClick, THUMBNAIL_URL, NAME } = this.props;

    return (
      <li onClick={handlerClick}>
        <p>
          <ComponentImage src={THUMBNAIL_URL} alt={THUMBNAIL_URL} className="rounded-2" />
        </p>
        <p className="text-center mb-0">{NAME}</p>
      </li>
    );
  }
}

export default ComponentPersonaTemplate;
