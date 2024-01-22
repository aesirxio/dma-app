/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { history, ButtonNormal } from 'aesirx-uikit';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { withGroupViewModel } from '../GroupListViewModels/GroupViewModelContextProvider';
const GroupListFormModal = lazy(() => import('./GroupListFormModal'));

class GroupListActionBar extends Component {
  groupFormModalViewModal = null;
  openModal = false;

  constructor(props) {
    super(props);

    const { viewModel } = props;
    this.groupFormModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;
  }

  createGroupHandler = () => {
    this.groupFormModalViewModal.openModal();
  };

  render() {
    return (
      <div className="d-flex justify-content-end pe-3">
        <ButtonNormal
          className="d-flex btn-success fw-semibold"
          onClick={this.createGroupHandler}
          iconStart={faPlus}
          text="txt_create_group"
        />
        <GroupListFormModal />
      </div>
    );
  }
}

export default withTranslation()(withGroupViewModel(withRouter(GroupListActionBar)));
