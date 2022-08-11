/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { Dropdown } from 'react-bootstrap';
import history from '../../../routes/history';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ButtonNormal from '../../../components/ButtonNormal';
import { withCampaignsViewModel } from '../CampaignsViewModels/CampaignsViewModelContextProvider';
const CampaignsFormModal = lazy(() => import('./CampaignsFormModal'));

class CampaignsActionBar extends Component {
  campaignsFormModalViewModal = null;
  campaignsListViewModel = null;
  openModal = false;

  constructor(props) {
    super(props);

    const { viewModel } = props;
    this.campaignsFormModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;

    this.campaignsListViewModel = viewModel ? viewModel.getListViewModel() : null;
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

  handerDeleteCampaigns = () => {
    this.campaignsListViewModel.deleteCampaigns();
  };

  render() {
    const {t}= this.props;
    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle className="p-3" variant="info" id="actions">
          {t("choose_an_action")}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 shadow">
            <Dropdown.Item className="px-3 py-2" onClick={this.handerDeleteCampaigns}>
            {t("delete")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonNormal
          onClick={this.createCampaignsHandler}
          iconStart={true}
          text="txt_create_campaigns"
        />
        <CampaignsFormModal />
      </div>
    );
  }
}

export default withTranslation('common')(withCampaignsViewModel(withRouter(CampaignsActionBar)));
