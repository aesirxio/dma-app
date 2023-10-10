/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Image as ComponentImage } from 'aesirx-uikit';

class ProjectNameModel {
  constructor(name) {
    this.name = name;
    // this.logo = logo;
  }

  getProjectName = () => {
    return (
      <>
        {/* {this.logo ? (
          <div className="project-name-logo">
            <ComponentImage
              src={this.logo}
              alt="project-logo"
              className="img-avatar-full me-2 w-100"
            />
          </div>
        ) : (
          ''
        )} */}

        <span>{this.name}</span>
      </>
    );
  };
}

export { ProjectNameModel };
