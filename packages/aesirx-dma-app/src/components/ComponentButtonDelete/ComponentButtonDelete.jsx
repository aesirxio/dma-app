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
    const view = window.location.pathname;
    return (
      <>
        <div>{view === '/campaigns' && <CampaignsDelete />}</div>
        <div>{view === '/projects' && <ProjectDelete />}</div>
        <div>{view === '/content' && <ContentDelete />}</div>
      </>
    );
  }
}

export default withTranslation()(ComponentButtonDelete);
