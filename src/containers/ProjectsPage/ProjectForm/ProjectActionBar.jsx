/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import history from '../../../routes/history';

import ButtonNormal from '../../../components/ButtonNormal';

import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { Dropdown } from 'react-bootstrap';
const ProjectFormModal = lazy(() => import('./ProjectFormModal'));

class ProjectActionBar extends Component {
  projectFormModalViewModel = null;
  projectsListViewModel = null;
  openModal = false;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;

    this.projectsListViewModel = viewModel ? viewModel.getListViewModel() : null;

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

  handerDeleteProject = () => {
    this.projectsListViewModel.deleteProjects();
  };

  render() {
    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle className="p-3" variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 shadow">
            <Dropdown.Item className="px-3 py-2" onClick={this.handerDeleteProject}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonNormal onClick={this.createProjectHandler} iconStart={true} text=" Create project" />
        <ProjectFormModal />
      </div>
    );
  }
}
export default withProjectViewModel(ProjectActionBar);
