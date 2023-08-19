/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { history, ButtonNormal } from 'aesirx-uikit';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { withTranslation } from 'react-i18next';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
const ProjectFormModal = lazy(() => import('./ProjectFormModal'));

class ProjectActionBar extends Component {
  projectFormModalViewModel = null;
  openModal = false;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;

    if (props.location.state) {
      this.openModal = props.location.state.openModal;

      history.replace(props.location.pathname, { openModal: false });
    }
  }

  componentDidMount() {
    if (this.openModal) {
      this.projectFormModalViewModel.openModal();
    }
  }

  createProjectHandler = () => {
    this.projectFormModalViewModel.openModal();
  };

  render() {
    return (
      <div className="d-flex justify-content-end pe-3">
        <ButtonNormal
          className="btn-success d-flex"
          onClick={this.createProjectHandler}
          iconStart={faPlus}
          text="txt_create_project"
        />
        <ProjectFormModal />
      </div>
    );
  }
}
export default withTranslation()(withProjectViewModel(ProjectActionBar));
