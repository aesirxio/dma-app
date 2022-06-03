/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ComponentImage from '../../../components/ComponentImage';

class ProjectLeadModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.name ?? '';
    this.avatarUrl = data.avatar_url ?? '';
  }

  getName = () => {
    return (
      <>
        <ComponentImage src={this.avatarUrl} className="img-avatar me-2" alt={this.avatarUrl} />
        {this.name}
      </>
    );
  };
}

export { ProjectLeadModel };
