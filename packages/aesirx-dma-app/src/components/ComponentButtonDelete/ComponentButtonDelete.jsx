/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import CampaignsDelete from 'containers/CampaignsPage/CampaignsForm/CampaignsDelete';
import ProjectDelete from 'containers/ProjectsPage/ProjectForm/ProjectDelete';
import ContentDelete from 'containers/ContentPage/ContentForm/ContentDelete';

class ComponentButtonDelete extends Component {
  render() {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];

    return (
      <>
        <div>{lastSegment === 'campaigns' && <CampaignsDelete />}</div>
        <div>{lastSegment === 'projects' && <ProjectDelete />}</div>
        <div>{lastSegment === 'content' && <ContentDelete />}</div>
      </>
    );
  }
}

export default withTranslation()(ComponentButtonDelete);
