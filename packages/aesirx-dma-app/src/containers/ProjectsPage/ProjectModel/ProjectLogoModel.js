/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Image as ComponentImage } from 'aesirx-uikit';

class ProjectLogoModel {
  constructor(logo) {
    this.logo = logo;
  }

  getProjectLogo = () => {
    return (
      <>
        <div className="project-name-logo">
          <ComponentImage
            src={this.logo ? this.logo : './assets/images/annotation.png'}
            alt="project-logo"
            className="w-100 object-fit-cover rounded-1"
            height={130}
          />
        </div>
      </>
    );
  };
}

export { ProjectLogoModel as ProjectLogoModel };
