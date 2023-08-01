/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { history, ButtonNormal } from 'aesirx-uikit';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { withCampaignsViewModel } from '../CampaignsViewModels/CampaignsViewModelContextProvider';
const CampaignsFormModal = lazy(() => import('./CampaignsFormModal'));

class CampaignsActionBar extends Component {
  campaignsFormModalViewModal = null;
  openModal = false;

  constructor(props) {
    super(props);

    const { viewModel } = props;
    this.campaignsFormModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;
    if (props.location.state) {
      this.openModal = props.location.state.openModal;

      history.replace(props.location.pathname, { openModal: false });
    }
  }

  componentDidMount() {
    if (this.openModal) {
      this.campaignsFormModalViewModal.loadForm();
    }
  }
  createCampaignsHandler = () => {
    this.campaignsFormModalViewModal.loadForm();
  };

  render() {
    return (
      <div className="d-flex justify-content-end">
        <ButtonNormal
          className="d-flex btn-success"
          onClick={this.createCampaignsHandler}
          iconStart={faPlus}
          text="txt_create_campaigns"
        />
        <CampaignsFormModal />
      </div>
    );
  }
}

export default withTranslation()(withCampaignsViewModel(withRouter(CampaignsActionBar)));
