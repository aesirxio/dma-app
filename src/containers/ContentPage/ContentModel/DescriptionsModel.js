/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

class DescriptionsModel {
  constructor(data) {
    this.descriptions = data[0];
  }

  getChannelDescriptions = () => {
    return <>{this.descriptions ? this.descriptions.description : ''}</>;
  };
}

export { DescriptionsModel };
